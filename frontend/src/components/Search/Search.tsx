import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (query) {
            navigate(`/search?q=${query}`)
            return
        }
    }
    return (
        <div className={styles.search}>
            <div className={styles.searchContent}>
                <div className={styles.searchHeader}>
                    <h2>O melhor lugar para Desenvolvedores</h2>
                    <p>Encontre por área ou nome:</p>
                    <form onSubmit={handleSubmit}>
                        <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
                        <input type="submit" value="Buscar" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Search