import React from "react";
import { render, screen } from "@testing-library/react";
import Portfolio from "../components/Portfolio/Portfolio";
import '@testing-library/jest-dom';

describe('Portfolio component', () => {
    it('renders the component', () => {
        render(<Portfolio />);
        const headingElement = screen.getByText(/portfolio/i);
        expect(headingElement).toBeInTheDocument();
    });

    it('displays the total value of the portfolio', () => {
        render(<Portfolio />);
        const totalValueElement = screen.getByText(/total value: \$1000/i);
        expect(totalValueElement).toBeInTheDocument();
    });

    it('displays a pie chart of the coins and their investments', () => {
        render(<Portfolio />);
        const pieChartElement = screen.getByTestId('portfolio-pie-chart');
        expect(pieChartElement).toBeInTheDocument();
    });

});
