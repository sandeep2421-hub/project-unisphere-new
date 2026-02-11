import { render, screen } from '@testing-library/react';
import App from './App';

test('renders key components', () => {
    render(<App />);
    const loginElement = screen.getByText(/User Login/i);
    const regElement = screen.getByText(/Registration/i);
    const homeElement = screen.getByText(/Home/i);
    const linkElement = screen.getByText(/learn react/i);
    
    expect(linkElement).toBeInTheDocument();
    expect(loginElement).toBeInTheDocument();
    expect(regElement).toBeInTheDocument();
    expect(homeElement).toBeInTheDocument();
});
