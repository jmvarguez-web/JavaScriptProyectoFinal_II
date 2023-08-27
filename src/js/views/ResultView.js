import View from './View.js'; // Importa la clase View
import icons from '../../img/icons.svg';
class ResultsView extends View{
    // Declara el elemento padre como privado (_parentElement)
    _parentElement = document.querySelector('.results'); // Utiliza el selector correspondiente
    _errorMessage = 'No recipes found for your query';
    _mensage = '';


    // Crea el método _generateMarkupPreview
    _generateMarkupPreview(result) {

        // Regresa el markup del resultado
        return `
    <li class="preview">
        <a class="preview__link preview__link--active" href="#${result.id}">
        <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${result.title}</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
            <svg>
                <use href="${icons}#icon-user"></use>
            </svg>
            </div>
        </div>
        </a>
    </li>
    `;
    }

    // Crea el método generateMarkup
    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join('');
    }
}

export default new ResultsView(); // Exporta una instancia de ResultsView por defecto
