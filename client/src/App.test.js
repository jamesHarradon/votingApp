import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(ctx.json({
      id: 1, 
      email: 'test-admin@gmail.com', 
      first_name: 'John', 
      last_name: 'Doe', 
      role: 'admin', 
      election_ids:[1, 2, 3, 4]
    }),ctx.delay(150))
  })
)

beforeEach(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )
})

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Login', () => {
  test('Login screen renders correctly', async () => {
    const loginDiv = screen.getByTestId('login');
    const btn = screen.getByRole('button');
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(loginDiv).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('Displays error messages when blank login fields submitted', async () => {
    userEvent.click(screen.getByRole('button'));
    const emailMsg = screen.getByTestId('invalid-email');
    const passwordMsg = screen.getByTestId('invalid-password');
    expect(emailMsg).toHaveTextContent('Email is required');
    expect(passwordMsg).toHaveTextContent('Password is required');
  })

  test('Displays alert when login details incorrect', async () => {
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(emailInput, 'test-admin@gmail.com');
    userEvent.type(passwordInput, 'wrongpassword');
    userEvent.click(screen.getByRole('button'));
    const alert = await screen.findByRole('alert');
    expect(alert).toBeInTheDocument();
  })
});

describe('User', () => {
  test('User can login', async () => {
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(emailInput, 'test-admin@gmail.com');
    userEvent.type(passwordInput, 'testAdmin');
    userEvent.click(screen.getByRole('button'));
    const voterHeader = await screen.findByText('Voter');
    expect(voterHeader).toBeInTheDocument();
  })
})