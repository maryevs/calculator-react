import React from "react";
import {Button} from "./Button";
import {Display} from "./Display";

export class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            result: 0,
        };
    };

    isNumber(param) {
        return (param.match(/\d+/g));
    }

    getOperator(operator, left, right) {
        switch (operator) {
            case "+":
                left += right;
                break;
            case "-":
                left -= right;
                break;
            case "*":
                left *= right;
                break;
            case "/":
                left /= right;
                break;
            case "^":
                left = Math.pow(left, right);
                break;
            default: left = '';
        }
        return left;
    }

    pushNumber(number) {
        let history = this.state.history.slice();
        let lastElem = history[history.length-1];
        let newElem;

        if (history.length === 0) {
            history.push(number);
            this.setState({
                history: history,
                result: parseFloat(number),
            });
        }
        else {
            if (this.isNumber(lastElem)) {
                newElem = history.pop() + number;
                history.push(newElem);
                this.setState({
                    history: history,
                    result: parseFloat(newElem),
                });
            }
            else {
                history.push(number);
                this.setState({
                    history: history,
                    result: parseFloat(number),
                });
            }
        }

    }

    add() {
        let history = this.state.history.slice();
        history.push('+');
        this.setState({
            history: history,
        });
    }

    subtract() {
        let history = this.state.history.slice();
        history.push('-');
        this.setState({
            history: history,
        });
    }

    multiply() {
        let history = this.state.history.slice();
        history.push('*');
        this.setState({
            history: history,
        });
    }

    divide() {
        let history = this.state.history.slice();
        history.push('/');
        this.setState({
            history: history,
        });
    }

    pow() {
        let history = this.state.history.slice();
        history.push('^');
        this.setState({
            history: history,
        });
    }

    cleanAll() {
        this.setState({
            history: [],
            result: 0,
        });
    }

    deleteLast() {
        let history = this.state.history.slice();
        let lastElem = history[history.length-1];

        if (lastElem.length === 1) {
            history.pop();
        }
        else {
            let newElem = history[history.length-1].slice(0, -1);
            history.pop();
            history.push(newElem);
        }
        this.setState({
            history: history,
            result: lastElem.slice(0,-1),
        });
    }

    doPlusMinus() {
        let history = this.state.history.slice();
        let lastElem = -history[history.length-1];
        history[history.length-1] = lastElem;
        this.setState({
            history: history,
            result: lastElem,
        });
    }

    calculate() {
        let result = 0,
            history = this.state.history.slice(),
            operators = [],
            numbers = [],
            num2,
            operator;

        for (let i = 0; i < history.length; i++) {
            if (this.isNumber(history[i])) {
                numbers.push(history[i]);
            }
            else {
                operators.push(history[i]);
            }
        }

        while (numbers.length > 0) {
            if (result === 0) {
                result = parseFloat(numbers.shift());
                operator = operators.shift();
                num2 = parseFloat(numbers.shift());
            }
            else {
                operator = operators.shift();
                num2 = parseFloat(numbers.shift());
            }
            result = this.getOperator(operator, result, num2);
        }
        this.setState({
            result: result,
        });
    }




    getKeyNumber(eventKey) {
        let numStr;
        switch (eventKey) {
            case "1":
                numStr = "1";
                break;
            case "2":
                numStr = "2";
                break;
            case "3":
                numStr = "3";
                break;
            case "4":
                numStr = "4";
                break;
            case "5":
                numStr = "5";
                break;
            case "6":
                numStr = "6";
                break;
            case "7":
                numStr = "7";
                break;
            case "8":
                numStr = "8";
                break;
            case "9":
                numStr = "9";
                break;
            case "0":
                numStr = "0";
                break;
            default: numStr = '';
        }
        return numStr;
    }

    handleClick(symbol) {
        const history = this.state.history.slice();

        switch (symbol) {
            case "+":
                this.add();
                break;
            case "-":
                this.subtract();
                break;
            case "*":
                this.multiply();
                break;
            case "/":
                this.divide();
                break;
            case "^":
                this.pow();
                break;
            case "=":
                this.calculate();
                break;
            case "+/-":
                this.doPlusMinus();
                break;
            case "ac":
                this.cleanAll();
                break;
            case "<-":
                this.deleteLast();
                break;
            case ".":
                this.pushNumber(symbol);
                break;
            case this.getKeyNumber(symbol):
                this.pushNumber(symbol);
                break;
            default:
                symbol = '';
        }

    }


    render() {

        return (
            <div id="calcBody" className="container">

                <Display history={this.state.history} result={this.state.result}/>
                <div className="buttons">

                    <div className="row1">

                        <div className="col1">
                            <div className="row1">
                                <div className="col1">
                                    <Button class={"light"} handleClick={() => this.handleClick('ac')}>AC</Button>
                                    <Button class={"secondary"} handleClick={() => this.handleClick('7')}>7</Button>
                                    <Button class={"secondary"} handleClick={() => this.handleClick('4')}>4</Button>
                                    <Button class={"secondary"} handleClick={() => this.handleClick('1')}>1</Button>
                                    <Button class={"secondary"} handleClick={() => this.handleClick('0')}>0</Button>
                                </div>
                                <div className="col1">
                                    <Button class={"light"} handleClick={() => this.handleClick('<-')}><i className="fas fa-arrow-left"></i></Button>
                                    <Button class={"secondary"} handleClick={() => this.handleClick('8')}>8</Button>
                                    <Button class={"secondary"} handleClick={() => this.handleClick('5')}>5</Button>
                                    <Button class={"secondary"} handleClick={() => this.handleClick('2')}>2</Button>
                                    <Button class={"secondary"} handleClick={() => this.handleClick('.')}>.</Button>
                                </div>
                            </div>
                        </div>

                        <div className="col1">
                            <div className="row1">
                                <div className="col1">
                                    <Button class={"light"} handleClick={() => this.handleClick('+/-')}>+/-</Button>
                                    <Button class={"secondary"} handleClick={() => this.handleClick('9')}>9</Button>
                                    <Button class={"secondary"} handleClick={() => this.handleClick('6')}>6</Button>
                                    <Button class={"secondary"} handleClick={() => this.handleClick('3')}>3</Button>
                                    <Button class={"info"} handleClick={() => this.handleClick('^')}>x<sup>y</sup></Button>
                                </div>
                                <div className="col1">
                                    <Button class={"warning"} handleClick={() => this.handleClick('/')}><i className="fas fa-divide"></i></Button>
                                    <Button class={"warning"} handleClick={() => this.handleClick('*')}><i className="fas fa-times"></i></Button>
                                    <Button class={"warning"} handleClick={() => this.handleClick('-')}><i className="fas fa-minus"></i></Button>
                                    <Button class={"warning"} handleClick={() => this.handleClick('+')}><i className="fas fa-plus"></i></Button>
                                    <Button class={"warning"} handleClick={() => this.handleClick('=')}><i className="fas fa-equals"></i></Button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        );
    }
}