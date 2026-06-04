/*
 * Class Component method testing — lesson notes
 *
 * Q: Why I am talking about class component?
 * A: Many older React apps still use class components. Their methods live on
 *    the instance (this.handleClick). react-test-renderer lets you call those
 *    methods directly in tests. New apps use functions + hooks, but this
 *    skill helps when you maintain legacy code.
 *
 * Q: Make class component?
 * A: This file is a class component with state and handleIncrement method.
 *
 * Q: Install React test renderer?
 * A: npm install --save-dev react-test-renderer@19.2.6
 *    (Use the same major version as your react package.)
 *
 * Q: Test class component method?
 * A: See App.test.js (wrap updates in act()):
 *    const tree = renderer.create(<App />);
 *    const instance = tree.root.findByType(App).instance;
 *    instance.handleIncrement();
 *    expect(instance.state.count).toBe(1);
 *    Note: getInstance() may return null in React 19 — use findByType(App).instance.
 *    react-test-renderer is deprecated; prefer Testing Library for new code.
 *
 * Run: npm test -- src/15-class-component-method-testing
 */

import { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div className="App">
        <h1>15 - Class Component Method Testing</h1>
        <p>Count: {this.state.count}</p>
        <button type="button" onClick={this.handleIncrement}>
          Increment
        </button>
      </div>
    );
  }
}

export default App;
