// React.render(<App />, document.getElementById('root'));
// el -> <App />
// rootDomElement -> document.getElementById('root')
const render = (el, rootDomElement) => {
    // В этой функции описывается механизм размещения элемента el в указанном узле rootDomElement
    // Например, ReactDom.render(<App />, document.getElementById('root'));
}

// Экспортируем как ReactDom.render
const ReactDom = {
    render
};

export default ReactDom;
