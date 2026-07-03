import styles from './ErrorState.module.css'

type Props = {
    errorTitle: string,
    errorMessage: string
}

export default function ErrorState({errorTitle, errorMessage}: Props){
    return (
        <div className={styles.errorState} role="alert">
            <h2>{errorTitle}</h2>
            <p>{errorMessage}</p>
        </div>
    )
}
