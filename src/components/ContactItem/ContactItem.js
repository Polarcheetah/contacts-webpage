import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserById, toggleSelectedProp } from '../../redux/contactsRedux';
import styles from './ContactItem.module.scss';

const ContactItem = ({ id }) => {
  const userData = useSelector(({ contacts }) => getUserById({ contacts }, id));
  //console.log(userData);

  const userName = `${userData.first_name} ${userData.last_name}`;
  const dispatch = useDispatch();
  const handleCheckbox = () => {
    dispatch(toggleSelectedProp(id));
  };

  return (
    <Container>
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
          {/* <input
            type='checkbox'
            className={styles.checkbox}
            value={userData.id}
            onChange={handleCheckbox}
          /> */}
          <Form>
            <Form.Check
              type='checkbox'
              value={userData.selected}
              checked={userData.selected}
              onChange={handleCheckbox}
            />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactItem;
