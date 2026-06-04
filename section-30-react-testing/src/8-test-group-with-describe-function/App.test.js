import { render, screen } from '@testing-library/react';
import App from './App';

function renderApp() {
    return render(<App />);
}

// Group 1: top-level describe for the whole component
describe('App component', () => {
    describe('heading', () => {
        test('renders lesson title', () => {
            renderApp();
            expect(
                screen.getByRole('heading', {
                    name: /8 - test group with describe function/i,
                })
            ).toBeInTheDocument();
        });
    });

    // Nested describe — sub-group for form fields
    describe('input fields', () => {
        test('renders username label', () => {
            renderApp();
            expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        });

        test('renders username input with placeholder', () => {
            renderApp();
            expect(
                screen.getByPlaceholderText(/enter username/i)
            ).toBeInTheDocument();
        });

        test('renders username input with default value', () => {
            renderApp();
            expect(screen.getByRole('textbox')).toHaveValue('Mahesh Sutar');
        });
    });

    describe('button', () => {
        test('renders save button', () => {
            renderApp();
            expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
        });
    });
});

// Skip example — this whole group is skipped (shows as skipped in report)
describe.skip('skipped example group', () => {
    test('does not run because describe.skip is used', () => {
        expect(true).toBe(false);
    });
});

/*
 * Only example — uncomment ONE block to try, then comment again before commit.
 *
 * describe.only('only this group runs', () => {
 *   test('only test inside only group', () => {
 *     renderApp();
 *     expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
 *   });
 * });
 *
 * test.only('only this single test runs', () => {
 *   renderApp();
 *   expect(screen.getByText(/mahesh sutar/i)).toBeInTheDocument();
 * });
 */
