import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getSelectedUsers } from '../../redux/contactsRedux';
import ContactItem from '../ContactItem/ContactItem';

const ContactsList = ({ contacts }) => {
  const selectedUsers = useSelector(getSelectedUsers);

  console.log(
    'selected users',
    selectedUsers.map((user) => user.id)
  );

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
