import { render, screen, fireEvent} from '@testing-library/react';
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




test('App component doesn\'t render duplicate Task', async () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const addButton = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: 'Test' } });
  fireEvent.change(inputDate, { target: { value: '6/30/23'}});
  fireEvent.click(addButton);

  fireEvent.change(inputTask, { target: { value: 'Test' } });
  fireEvent.change(inputDate, { target: { value: '6/30/23'}});
  fireEvent.click(addButton);

  const items = await screen.findAllByText('Test');
  expect(items.length).toBe(1);
 });

 test('App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByRole('textbox', {name: /Due Date/i});
  const addButton = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputDate, { target: { value: '6/30/23'}});
  fireEvent.click(addButton);

  const noItemsText = screen.getByText("You have no todo's left");
  expect(noItemsText).toBeInTheDocument();
 });

 test('App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const addButton = screen.getByRole('button', {name: /Add/i});

  fireEvent.change(inputTask, { target: { value: 'Test' } });
  fireEvent.click(addButton);

  const noItemsText = screen.getByText("You have no todo's left");
  expect(noItemsText).toBeInTheDocument();
 });



 test('App component can be deleted thru checkbox', () => {
  render(<App />);
 });


 test('App component renders different colors for past due events', () => {
  render(<App />);
 });
