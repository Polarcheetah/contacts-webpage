import { Form } from 'react-bootstrap';
import Button from '../Button/Button';
import styles from './SearchForm.module.scss';
import { BiSearchAlt } from 'react-icons/bi';

const SearchForm = ({ action }) => {
  return (
    <Form className={styles.searchForm}>
      <Form.Control
        as='input'
        type='text'
        className={styles.input}
        placeholder='Type user filter'
        onChange={(e) => action(e.target.value)}
      />
      <Button className={styles.button}>
        <BiSearchAlt />
      </Button>
    </Form>
  );
};

export default SearchForm;
