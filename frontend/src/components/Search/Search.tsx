import { FormEvent } from 'react';
import styles from './Search.module.css';

const Search = () => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <div className={styles.search}>
        <div className={styles.searchContent}>
            <div className={styles.searchHeader}>
                <h2>O melhor lugar para Desenvolvedores</h2>
                <p>Encontre por área ou nome:</p>
            <form onSubmit={handleSubmit}>
                <input type="text" />
                <input type="submit" value="Buscar" />
            </form>
            </div>
        </div>
        </div>
    )
}

export default Search