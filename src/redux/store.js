import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { initialContactsState, initialState } from './initialState';

//selectors

//actions
const createActionName = (actionName) => `app/contacts/${actionName}`;
const FETCH_START = createActionName('FETCH_START');
const CONTACTS_DOWNLOAD = createActionName('CONTACTS_DOWNLOAD');
const FETCH_ERROR = createActionName('FETCH_ERROR');

//action creators
const fetchStart = (payload) => ({ type: FETCH_START, payload });
const downloadContacts = (payload) => ({ type: CONTACTS_DOWNLOAD, payload });
const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

export const fetchContacts = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    fetch(
      'https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json'
    )
      .then((res) => res.json())
      .then((contacts) => dispatch(downloadContacts(contacts)))
      .catch((error) => {
        dispatch(fetchError(error.message || true));
      });
  };
};

const reducer = (state = initialContactsState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        contacts: {
          ...state.contacts,
          status: { error: false, loading: true },
        },
      };
    case CONTACTS_DOWNLOAD:
      return {
        contacts: {
          ...state.contacts,
          status: { error: false, loading: false },
          data: action.payload,
        },
      };
    case FETCH_ERROR:
      return {
        contacts: {
          ...state.contacts,
          status: { error: true, loading: false },
        },
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
export default store;
