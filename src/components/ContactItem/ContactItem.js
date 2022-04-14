import { Col, Container, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, toggleSelectedProp } from '../../redux/contactsRedux';
import styles from './ContactItem.module.scss';

const ContactItem = ({ id }) => {
  const dispatch = useDispatch();

  //get data of single user
  const userData = useSelector(({ contacts }) => getUserById({ contacts }, id));

  //create full userName of first name and last name
  const userName = `${userData.first_name} ${userData.last_name}`;

  //change property 'selected' of user when checkbox state changes
  const handleCheckbox = () => {
    dispatch(toggleSelectedProp(id));
  };

  return (
    <Container onClick={handleCheckbox}>
      <Row className={styles.item}>
        <Col className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={userData.avatar}
            alt='avatar'
            roundedCircle
          />
          <p className={styles.userName}>{userName}</p>
        </Col>
        <Col>
          <p className={styles.email}>{userData.email}</p>
        </Col>
        <Col className={styles.checkboxWrapper}>
          <input
            type='checkbox'
            value={userData.selected}
            checked={userData.selected}
            onchange={handleCheckbox}
            className={styles.checkbox}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactItem;
