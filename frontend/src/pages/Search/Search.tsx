import { useSearchParams } from "react-router-dom";
import styles from './Search.module.css';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
  return (
    <div className={styles.search}>
        <h2>Resultados para: {query}</h2>
    </div>
  )
}

export default Search;