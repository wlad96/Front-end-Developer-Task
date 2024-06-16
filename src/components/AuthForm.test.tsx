import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AuthForm from '@/components/AuthForm';

describe('AuthForm', () => {
  test('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<AuthForm type="register" onSubmit={() => {}} />);
    
    expect(getByText('Your email')).toBeInTheDocument();
    expect(getByPlaceholderText('E-mail')).toBeInTheDocument();
    expect(getByText('Your password')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByText('Confirm password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(getByText('Sign up')).toBeInTheDocument();
    expect(getByText('I have an account.')).toBeInTheDocument();
  });

  test('displays error on password mismatch during registration', () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<AuthForm type="register" onSubmit={() => {}} />);

    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm password');
    const submitButton = getByText('Sign up');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword' } });
    fireEvent.click(submitButton);

    expect(getByRole('alert')).toHaveTextContent('Passwords do not match');
  });

  test('displays error on incorrect email or password during login', () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<AuthForm type="login" onSubmit={() => {}} />);

    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign in');

    fireEvent.change(emailInput, { target: { value: 'incorrect@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    expect(getByRole('alert')).toHaveTextContent('Некорректный email');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'incorrect-password' } });
    fireEvent.click(submitButton);

    expect(getByRole('alert')).toHaveTextContent('Некорректный пароль');
  });
});