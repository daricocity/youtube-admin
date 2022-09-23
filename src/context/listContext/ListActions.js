// UPDATE MOVIE ACTION
const updateListStart = () => ({
    type: 'UPDATE_LIST_START'
});

const updateListSuccess = (list) => ({
    type: 'UPDATE_LIST_SUCCESS',
    payload: list
});

const updateListFailure = () => ({
    type: 'UPDATE_LIST_FAILURE'
});

// DELETE LIST ACTION
const deleteListStart = () => ({
    type: 'DELETE_LIST_START'
});

const deleteListSuccess = (id) => ({
    type: 'DELETE_LIST_SUCCESS',
    payload: id
});

const deleteListFailure = () => ({
    type: 'DELETE_LIST_FAILURE'
});

// GET LIST ACTION
const getListsStart = () => ({
    type: 'GET_LISTS_START'
});

const getListsSuccess = (movies) => ({
    type: 'GET_LISTS_SUCCESS',
    payload: movies
});

const getListsFailure = () => ({
    type: 'GET_LISTS_FAILURE'
});

// CREATE LIST ACTION
const createListStart = () => ({
    type: 'CREATE_LIST_START'
});

const createListSuccess = (list) => ({
    type: 'CREATE_LIST_SUCCESS',
    payload: list
});

const createListFailure = () => ({
    type: 'CREATE_LIST_FAILURE'
});

export {
    getListsStart,
    getListsSuccess,
    getListsFailure,
    deleteListStart,
    deleteListSuccess,
    deleteListFailure,
    createListStart,
    createListSuccess,
    createListFailure,
    updateListStart,
    updateListSuccess,
    updateListFailure
};
