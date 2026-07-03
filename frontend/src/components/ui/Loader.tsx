import styles from './Loader.module.css'

export default function Loader(){
    return(
        <div className={styles.loader} role="status" aria-live="polite">
            <span className={styles.spinner} aria-hidden="true" />
            <span>Загрузка данных...</span>
        </div>
    )
}
