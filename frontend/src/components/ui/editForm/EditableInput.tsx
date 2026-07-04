import type { UseFormRegisterReturn } from "react-hook-form"

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
        <div>
            <span>{label}: </span>

            {isEditing ? (
                <>
                    <input type={type} placeholder={placeholder} {...register}/>
                    {error && <p>{error}</p>}
                </>
            ) : (
                <p>{value || '-'}</p>
            )}
        </div>
    )
}