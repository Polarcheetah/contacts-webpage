import { Form } from 'react-bootstrap';
import Button from '../Button/Button';
import styles from './SearchForm.module.scss';
import { BiSearchAlt } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateSearchString } from '../../../redux/searchStringRedux';

const SearchForm = () => {
  const dispatch = useDispatch();

  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    dispatch(updateSearchString(''));
  }, []);

  //update search string in store when input updated
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSearchString(searchString));
  };

  return (
    <Form className={styles.searchForm} onSubmit={handleSubmit}>
      <Form.Control
        as='input'
        type='text'
        className={styles.input}
        placeholder='Type user filter'
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Button className={styles.button}>
        <BiSearchAlt />
      </Button>
    </Form>
  );
};

export default SearchForm;
