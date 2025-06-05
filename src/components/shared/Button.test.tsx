import { render, screen } from '@testing-library/react';

function Button() {
  return <button>Hello Button</button>;
}

describe('Button component', () => {
  it('renders the button correctly', () => {
    render(<Button />);
    const buttonElement = screen.getByText(/hello button/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
