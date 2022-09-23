import PropTypes from 'prop-types';
import ListsReducers from './ListReducers';
import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
    lists: [],
    isFetching: false,
    error: false
};

const ListContext = createContext(INITIAL_STATE);

const ListContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ListsReducers, INITIAL_STATE);

    return (
        <ListContext.Provider
            value={{
                lists: state.lists,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </ListContext.Provider>
    );
};

ListContextProvider.propTypes = {
    children: PropTypes.node
};

export { ListContext, ListContextProvider };
