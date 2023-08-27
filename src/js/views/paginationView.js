import View from './View.js'; // Importa la clase View
import icons from '../../img/icons.svg';

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');

    

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            console.log(goToPage);
            handler(goToPage);
        });


    }

    _generateMarkup() {
       
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        let currentPage = this._data.page;

        /*En este escenario valida si la página es igual a 1 y si el número de páginas es mayor a 1. */
        if (currentPage === 1 && numPages > 1) {
            return `<button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>`;
        }

        /*valida si currentPage es igual al número de páginas, es > 1*/
        if (currentPage === numPages && numPages > 1) {
            return `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>`

        }

        /*Valida si la página es menor al número de páginas, si
eso se cumple*/
        if (currentPage < numPages) {
            return `<button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
            </button>
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${currentPage - 1}</span>
                </button>`;
        }


        // Estando en la página 1 y no existen más páginas
        if (currentPage === 1 && numPages === 1) {
            return '';
        }


    }



}
export default new PaginationView();