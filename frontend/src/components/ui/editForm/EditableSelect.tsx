import type { UseFormRegisterReturn } from "react-hook-form"
import styles from './EditableSelect.module.css'

type Option = {
    value: string
    label: string
}

type EditableSelectProps = {
    label: string 
    value?: string
    displayValue?: string
    isEditing: boolean
    options: Option[]
    error?: string
    register?: UseFormRegisterReturn
}

export default function EditableSelect({ label, value, displayValue, isEditing, options, error, register }: EditableSelectProps){
    return(
        <div className={styles.field}>
            <span className={styles.label}>{label}</span>
            {isEditing ? (
                <>
                    <select className={styles.control} {...register}>
                        {options.map((option)=>(
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    {error && <p className={styles.error}>{error}</p>}
                </>
            ) : (
                <p className={styles.value}>{displayValue || value || '-'}</p>
            )}

        </div>
    )
}