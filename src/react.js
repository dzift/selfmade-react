// src/react.js
import { h } from "snabbdom";

const createElement = (type, props = {}, ...children) => {
    if (type.prototype && type.prototype.isReactClassComponent) {
        const componentInstance = new type(props);

        // Присваиваем текущий экземпляр vNode
        componentInstance.__vNode = componentInstance.render();

        return componentInstance.__vNode;
    }

    if (typeof type == "function") {
        return type(props);
    }

    return h(type, { props }, children);
};

// Базовый класс Component
class Component {
    constructor() {}

    componentDidMount() {}

    setState(partialState) {
        // Обновляем состояние, сохранив первый уровень вложенности предыдущего состояния
        this.state = {
            ...this.state,
            ...partialState,
        };
        // Вызываем метод __updater, который назначается в ReactDom
        React.__updater(this);
    }

    render() {}
}

Component.prototype.isReactClassComponent = true;

// Экспортируем как React.createElement и React.Component
const React = {
    createElement,
    Component,
};

export default React;
