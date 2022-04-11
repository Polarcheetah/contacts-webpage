import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../../redux/store';
import Header from '../../common/Header/Header';
import SearchForm from '../../common/SearchForm/SearchForm';
import ContactsList from '../../ContctsList/ContactsList';

const Contacts = () => {
  //fetch contacts data from JSON file
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchContacts()), []);

  //define const for checking if no errors and loading finished
  const { error, loading } = useSelector(({ contacts }) => contacts.status);

  //define table of objects with photos data
  const contacts = useSelector((state) => state.contacts.data);

  return (
    <div>
      <Header />
      {loading && <p>Loading...</p>}
      {!loading && !error && contacts?.length > 0 && (
        <Container>
          <SearchForm />
          <ContactsList />
        </Container>
      )}
    </div>
  );
};

export default Contacts;
