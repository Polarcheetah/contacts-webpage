import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, getAllUsers } from '../../../redux/store';
import Header from '../../common/Header/Header';
import SearchForm from '../../common/SearchForm/SearchForm';
import ContactsList from '../../ContactsList/ContactsList';

const Contacts = () => {
  //fetch contacts data from JSON file
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchContacts()), []);

  //define const for checking if no errors and loading finished
  const { error, loading } = useSelector(({ contacts }) => contacts.status);

  //define table of objects with contacts data
  const contacts = useSelector(getAllUsers);
  console.log(contacts);

  return (
    <div>
      <Header />
      {loading && <p>Loading...</p>}
      {!loading && !error && contacts.length > 0 && (
        <Container>
          <SearchForm />
          <ContactsList />
        </Container>
      )}
    </div>
  );
};

export default Contacts;
