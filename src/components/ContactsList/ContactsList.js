import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/store';
import ContactItem from '../ContactItem/ContactItem';

const ContactsList = () => {
  const contacts = useSelector(getAllUsers);
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
