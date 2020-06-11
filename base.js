
export const elements = {
    searchInput : document.querySelector('.search__field'),
    searchForm : document.querySelector('.search'),
    searchRes: document.querySelector('.results'),
    searchResList : document.querySelector('search__list'),
    searchResPage : document.querySelector('results__pages')
};

export const elementsSting = {
    loader: 'loder'
}

export const renderLoader = parent => {
const loader = `<div class=${elementsStrings.loader}>
<svg> <use hrfe = "img/icon.svg#icon-cw"><use/> </svg> </div>`
parent.insertAdjacentHTML('afterbeging',loader);
};

export const clearLoader = () =>{
    const loader = document.querySelector(`.${elementsStrings.loader}`)
    if(loader) loader.parentElement.removeChild(loader);

}