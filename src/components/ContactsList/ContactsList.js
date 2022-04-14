import { useEffect } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getSelectedUsers } from '../../redux/contactsRedux';
import ContactItem from '../ContactItem/ContactItem';

const ContactsList = ({ contacts }) => {
  //create array of selected user's Ids
  const selectedUsers = useSelector(getSelectedUsers);

  //console.log selectedUsers array when it changes
  useEffect(() => {
    console.log(
      'selected users ids',
      selectedUsers.map((user) => user.id)
    );
  }, [selectedUsers]);

  return (
    <ListGroup>
      {contacts.map((contact) => (
        <ListGroupItem key={contact.id}>
          <ContactItem id={contact.id}></ContactItem>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default ContactsList;
