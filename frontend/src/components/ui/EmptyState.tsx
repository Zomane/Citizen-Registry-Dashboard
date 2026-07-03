import styles from './EmptyState.module.css'

type Props = {
  title: string
  message?: string
}

export default function EmptyState({ title, message }: Props) {
  return (
    <div className={styles.emptyState}>
      <h2>{title}</h2>
      {message && <p>{message}</p>}
    </div>
  )
}