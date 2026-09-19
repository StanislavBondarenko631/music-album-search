import styles from "./SearchBar.module.css";
import { Formik, Form, Field } from "formik";

interface SearchBarProps {
  onSubmit: (query: string) => void;
  onReset: () => void;
}

export default function SearchBar({ onSubmit, onReset }: SearchBarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={onReset}>
        🎵 Album-Search
      </div>

      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values) => {
          onSubmit(values.query.trim());
        }}
      >
        {({ resetForm }) => {
          const handleLogoClick = () => {
            resetForm();
            onReset();
          };

          return (
            <Form className={styles.form}>
              <div
                style={{ display: "none" }}
                id="hidden-reset-trigger"
                onClick={handleLogoClick}
              />

              <Field
                name="query"
                type="text"
                className={styles.input}
                placeholder="Search albums or groups..."
                autoComplete="off"
                autoFocus
              />
              <button type="submit" className={styles.button}>
                Search
              </button>
            </Form>
          );
        }}
      </Formik>
    </header>
  );
}
