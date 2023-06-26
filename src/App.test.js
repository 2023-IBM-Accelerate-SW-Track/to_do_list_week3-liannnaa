import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('App component renders', () => {
  render(<App />, container);
 });

test('new-item-button is a button', () => {
  render(<App/>, container);
  const element = screen.getByTestId('new-item-button');
  expect(element.outerHTML.toLowerCase().includes("button")).toBe(true)
});

test('new-item-input is an input', () => {
  render(<App/>, container);
  const element = screen.getByTestId('new-item-input');
  expect(element.outerHTML.toLowerCase().includes("input")).toBe(true)
});
