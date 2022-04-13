import sortByLastName from '../utils/sortByLastName';
import strContains from '../utils/strContains';
import { initialContactsState } from './initialState';

//selectors
export const getAllUsers = (state) => state.contacts.data;
export const getUserById = ({ contacts }, contactId) =>
  contacts.data.find((contact) => contact.id === contactId);

export const getFilteredUsers = ({ contacts, searchString }) =>
  contacts.data.filter(
    (contact) =>
      strContains(contact.last_name, searchString) ||
      strContains(contact.first_name, searchString)
  );

export const getSelectedUsers = ({ contacts }) =>
  contacts.data.filter((contact) => contact.selected === true);
//actions
const createActionName = (actionName) => `app/contacts/${actionName}`;
const FETCH_START = createActionName('FETCH_START');
const CONTACTS_DOWNLOAD = createActionName('CONTACTS_DOWNLOAD');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_SELECTED_PROP = createActionName('ADD_SELECTED_PROP');
const TOGGLE_SELECTED_PROP = createActionName('TOGGLE_SELECTED_PROP');
//action creators
const fetchStart = (payload) => ({ type: FETCH_START, payload });
const downloadContacts = (payload) => ({ type: CONTACTS_DOWNLOAD, payload });
const fetchError = (payload) => ({ type: FETCH_ERROR, payload });
const addSelectedProp = (payload) => ({ type: ADD_SELECTED_PROP, payload });
export const toggleSelectedProp = (payload) => ({
  type: TOGGLE_SELECTED_PROP,
  payload,
});

export const fetchContacts = () => {
  return (dispatch) => {
    dispatch(fetchStart());
    fetch(
      'https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json'
    )
      .then((res) => res.json())
      .then((contacts) => sortByLastName(contacts))
      .then((contacts) => dispatch(downloadContacts(contacts)))
      .then((contacts) => dispatch(addSelectedProp(contacts)))
      .catch((error) => {
        dispatch(fetchError(error.message || true));
      });
  };
};

const contactsReducer = (statePart = initialContactsState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...statePart,
        status: { error: false, loading: true },
      };
    case CONTACTS_DOWNLOAD:
      return {
        ...statePart,
        status: { error: false, loading: false },
        data: action.payload,
      };
    case FETCH_ERROR:
      return {
        ...statePart,
        status: { error: true, loading: false },
      };
    case ADD_SELECTED_PROP:
      return {
        data: statePart.data.map((contact) => ({
          ...contact,
          selected: false,
        })),
        status: { error: false, loading: false },
      };
    case TOGGLE_SELECTED_PROP:
      return {
        data: statePart.data.map((contact) =>
          contact.id === action.payload
            ? {
                ...contact,
                selected: !contact.selected,
              }
            : contact
        ),
        status: { error: false, loading: false },
      };
    default:
      return statePart;
  }
};

export default contactsReducer;
