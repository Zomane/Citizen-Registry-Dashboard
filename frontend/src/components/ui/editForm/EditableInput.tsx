import type { UseFormRegisterReturn } from "react-hook-form"
import styles from './EditableInput.module.css'

type EditableFieldProps = {
    label: string
    value?: string
    placeholder?: string
    isEditing: boolean
    error?: string
    register?: UseFormRegisterReturn
    type?: string
}

export default function EditableInput({ label, value, placeholder, isEditing, error, register, type}: EditableFieldProps){
    return (
        <div className={styles.field}>
            <span className={styles.label}>{label}</span>

            {isEditing ? (
                <>
                    <input className={styles.control} type={type} placeholder={placeholder} {...register}/>
                    {error && <p className={styles.error}>{error}</p>}
                </>
            ) : (
                <p className={styles.value}>{value || '-'}</p>
            )}
        </div>
    )
}