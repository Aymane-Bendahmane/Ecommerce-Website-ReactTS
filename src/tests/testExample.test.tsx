import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Store} from '../pages/Store';
import {loadItems} from '../actions/cartAction';
import cartReducer from '../reducers/cartReducer';
import {render, screen} from '@testing-library/react';

describe('Store', () => {
    test('renders store items correctly', () => {
        const mockItems = [
            { id: 1, name: 'Item 1', price: 10 },
            { id: 2, name: 'Item 2', price: 20 },
            { id: 3, name: 'Item 3', price: 30 },
        ];

        const store = createStore(cartReducer, { items: mockItems });

        const queryClient = new QueryClient();

        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Store />
                </QueryClientProvider>
            </Provider>
        );

        const item1 = screen.getByText('Item 1');
        const item2 = screen.getByText('Item 2');
        const item3 = screen.getByText('Item 3');

        expect(item1).toBeInTheDocument();
        expect(item2).toBeInTheDocument();
        expect(item3).toBeInTheDocument();
    });

    test('displays error message when data fetching fails', () => {
        const store = createStore(cartReducer, { items: [] });

        const queryClient = new QueryClient();

        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Store />
                </QueryClientProvider>
            </Provider>
        );

        // Simulate an error in data fetching
        store.dispatch(loadItems({ isError: true }));

        const errorMessage = screen.getByText('Error fetching data');
        expect(errorMessage).toBeInTheDocument();
    });
});
