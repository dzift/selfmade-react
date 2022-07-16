// src/react.js
import { h } from "snabbdom";

const createElement = (type, props = {}, ...children) => {
    if (type.prototype && type.prototype.isReactClassComponent) {
        const componentInstance = new type(props);

        componentInstance.__vNode = componentInstance.render();

        // Добавляем хук к виртуальной ноде snabbdom при создании этой ноды в реальном DOM
        componentInstance.__vNode.data.hook = {
            create: () => {
                componentInstance.componentDidMount();
            },
        };

        return componentInstance.__vNode;
    }

    if (typeof type == "function") {
        return type(props);
    }

    props = props || {};
    let dataProps = {};
    let eventProps = {};

    // Этот блок кода нужен для разделения атрибутов на пропсы и обработчики событий
    for (let propKey in props) {
        // Обработчики событий всегда начинаются с on, например: onClick, onChange и т. д.
        if (propKey.startsWith("on")) {
            // превращаем onClick в click
            const event = propKey.substring(2).toLowerCase();

            eventProps[event] = props[propKey];
        } else {
            dataProps[propKey] = props[propKey];
        }
    }

    // { props: dataProps } - пропсы snabbdom
    // { on: eventProps } - обработчики событий
    return h(type, { props: dataProps, on: eventProps }, children);
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
