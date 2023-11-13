import styles from "./style.module.css";

/**
 * A component that displays a loading spinner.
 * @returns A component that displays a loading spinner.
 */
export const Loading = () => {
  return (
    <img src="/icons/spinner.svg" alt="Loading" className={styles.loading} />
  );
};
