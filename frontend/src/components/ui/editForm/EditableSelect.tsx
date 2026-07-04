import type { UseFormRegisterReturn } from "react-hook-form";

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
        <div>
            <span>{label}: </span>
            {isEditing ? (
                <>
                    <select {...register}>
                        {options.map((option)=>(
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    {error && <p>{error}</p>}
                </>
            ) : (
                <p>{displayValue || value || '-'}</p>
            )}

        </div>
    )
}