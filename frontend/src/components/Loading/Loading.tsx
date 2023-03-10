import styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.scanner}>
                <span>Carregando...</span>
            </div>
        </div>
    )
}

export default Loading