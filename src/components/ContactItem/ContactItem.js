import { Col, Container, Form, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getUserById } from '../../redux/store';
import styles from './ContactItem.module.scss';

const ContactItem = ({ id }) => {
  const userData = useSelector(({ contacts }) => getUserById({ contacts }, id));
  //console.log(userData);

  const userName = `${userData.first_name} ${userData.last_name}`;

  const handleCheckbox = (e) => {
    e.preventDefault();
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
          <input
            type='checkbox'
            className={styles.checkbox}
            value={userData.id}
            onChange={handleCheckbox}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ContactItem;
