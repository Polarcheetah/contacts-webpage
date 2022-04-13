import { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, getFilteredUsers } from '../../../redux/contactsRedux';
import Header from '../../common/Header/Header';
import SearchForm from '../../common/SearchForm/SearchForm';
import ContactsList from '../../ContactsList/ContactsList';
import styles from './Contacts.module.scss';

const Contacts = () => {
  //fetch contacts data from JSON file
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchContacts()), []);

  //define const for checking if no errors and loading finished
  const { error, loading } = useSelector(({ contacts }) => contacts.status);

  //define table of objects with contacts data
  const contacts = useSelector((state) => getFilteredUsers(state));
  console.log(contacts);

  return (
    <div>
      <Header />
      {loading && <Spinner animation='border' variant='warning' />}
      {!loading && !error && contacts.length > 0 && (
        <Container>
          <SearchForm />
          <ContactsList contacts={contacts} />
        </Container>
      )}
    </div>
  );
};

export default Contacts;
