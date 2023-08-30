import icons from '../../img/icons.svg';
class View{
    _data;

    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0)) {
            this.renderError("No se encontro ningun resultado");
            return;
          }
        this._data = data;
        const markup = this._generateMarkup();
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    renderSpinner(parentEl) {
        const markup = `
    <div class="spinner">
    <svg>
    <use href="${icons}#icon-loader"></use>
    </svg>
    </div> 
    `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
        // parentEl.innerHTML = ''; // Limpiar el contenido previo
        //parentEl.insertAdjacentHTML('afterbegin', markup);
    }
    renderError(message = this._errorMessage) {
        //const message = 'We could not find that recipe. Please try another one!';
        const markup = `
    <div class="error">
        <div>
        <svg>
            <use href="${icons}#icon-alert-triangle"></use>
        </svg>
        </div>
        <p>${message}</p>
    </div>
    `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderMessage(message = this._message) {
        //const message = 'We could not find that recipe. Please try another one!';
        const markup = `
    <div class="error">
        <div>
        <svg>
            <use href="${icons}#icon-smile"></use>
        </svg>
        </div>
        <p>${message}</p>
    </div>
    `;
        this._clear();
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }

    _clear() {
        this._parentElement.innerHTML = '';
    }

}
export default View;