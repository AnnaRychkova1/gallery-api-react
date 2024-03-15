import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';

const notify = () =>
  toast('Please, input query!', {
    duration: 3000,
    icon: '🥺',
  });

import { Field, Form, Formik } from 'formik';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    if (!values.query) {
      notify();
    }
    onSubmit(values.query);

    resetForm();
  };

  return (
    <header id="header">
      <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.formField}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="query"
          />
          <button className={css.searchBtn} type="submit">
            Search
          </button>
          <Toaster
            toastOptions={{
              style: {
                background: '#4e75ff',
                color: '#fff',
              },
            }}
          />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
