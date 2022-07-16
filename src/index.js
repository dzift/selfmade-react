// src/index.js
import React from "./react";
import ReactDom from "./react-dom";
import Counter from "./counter";

const Greeting = ({ name }) => <p>Привет, {name}!</p>;

const App = (
    <div>
        <h1 className="primary">Да здравствует React!</h1>
        <p>Самостоятельная реализация React в 90 строк кода</p>
        <Greeting name={"Самодельный React"} />
        {/* Классовый компонент */}
        <Counter />
    </div>
);

ReactDom.render(App, document.getElementById("root"));
