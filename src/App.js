import React from 'react';
import './App.css';

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const operations = ['/', '*', '-', '+'];
const ids = {
	7: 'seven',
	8: 'eight',
	9: 'nine',
	4: 'four',
	5: 'five',
	6: 'six',
	1: 'one',
	2: 'two',
	3: 'three',
	0: 'zero',
	'/': 'divide',
	'*': 'multiply',
	'-': 'subtract',
	'+': 'add',
};
class App extends React.Component {
	state = {
		lastPressed: undefined,
		calc: '0',
		operation: undefined,
		ans: undefined,
	};

	handleClick = (e) => {
		const { calc, lastPressed } = this.state;
		const { innerText } = e.target;

		switch (innerText) {
			case 'AC': {
				this.setState({
					calc: '0',
				});
				break;
			}

			case '=': {
				const evaluated = eval(calc);
				this.setState({
					calc: evaluated,
					ans: evaluated,
				});
				break;
			}

			case '.': {
				const splitted = calc.split(/[\+\-\*\/]/);
				const last = splitted.slice(-1)[0];

				if (!last.includes('.')) {
					this.setState({
						calc: calc + '.',
					});
				}

				break;
			}

			default: {
				let e = undefined;
				if (operations.includes(innerText)) {
					if (operations.includes(lastPressed) && innerText !== '-') {
						const lastNumberIdx = calc
							.split('')
							.reverse()
							.findIndex(
								(char) => char !== ' ' && numbers.includes(+char)
							);
						e =
							calc.slice(0, calc.length - lastNumberIdx) +
							` ${innerText} `;
					} else {
						e = `${calc} ${innerText} `;
					}
				} else {
					e = calc === '0' ? innerText : calc + innerText;
				}

				this.setState({
					calc: e,
				});
			}
		}

		this.setState({
			lastPressed: innerText,
		});
	};
	render() {
		const { currentNumber, calc, ans } = this.state;

		return (
			<div className='calculator'>
				<div id='display' className='display'>
					<span className='input'>{calc}</span>
					<span className='answer'>{ans}</span>
				</div>

				<div className='numbers-container'>
					<button
						className='orange'
						onClick={this.handleClick}
						id='clear'>
						AC
					</button>
					{numbers.map((number) => (
						<button
							className={`${number === 0 && 'zero'}`}
							key={number}
							onClick={this.handleClick}
							id={ids[number]}>
							{number}
						</button>
					))}
					<button id='decimal' onClick={this.handleClick}>
						{' '}
						.{' '}
					</button>
				</div>

				<div className='operations-container'>
					{operations.map((operation) => (
						<button
							className='light-gray'
							key={operation}
							onClick={this.handleClick}
							id={ids[operation]}>
							{operation}
						</button>
					))}
					<button
						className='light-gray'
						onClick={this.handleClick}
						id='equals'>
						=
					</button>
				</div>
			</div>
		);
	}
}

export default App;
