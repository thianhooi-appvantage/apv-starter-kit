import { useReducer } from 'react';
import { pageReducer, PageState, PageAction } from '../../../components/PaginatedTable';

type State = PageState;
type Action = PageAction;

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        default:
            return pageReducer(state, action);
    }
};

const useListReducer = () =>
    useReducer(reducer, {
        // default pagination
        page: 1,
        pageSize: 10,
    });

export default useListReducer;
