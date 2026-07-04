import type { FormEventHandler } from 'react'
import type { FieldErrors, UseFormRegister } from 'react-hook-form'
import EditableInput from '../ui/editForm/EditableInput'
import EditableSelect from '../ui/editForm/EditableSelect'
import type { Citizen, UpdateCitizenDto } from '../../types/citizenType'
import styles from './CitizenDetailsForm.module.css'

type Props = {
    citizen: Citizen
    isEditing: boolean
    isPending: boolean
    errorMessage?: string
    errors: FieldErrors<UpdateCitizenDto>
    register: UseFormRegister<UpdateCitizenDto>
    onSubmit: FormEventHandler<HTMLFormElement>
    onCancelEditing: () => void
    onStartEditing: () => void
}

export default function CitizenDetailsForm({
    citizen,
    isEditing,
    isPending,
    errorMessage,
    errors,
    register,
    onSubmit,
    onCancelEditing,
    onStartEditing,
}: Props) {
    return (
        <form onSubmit={onSubmit}>
            <div>
                <EditableInput value={citizen.fullName} label='ФИО' isEditing={isEditing} placeholder='Введите ФИО'
                register={register('fullName', {
                    required: 'ФИО обязательно',
                    minLength: {
                        value: 3,
                        message: 'ФИО должно содержать минимум 3 символа'
                    }
                })} error={errors.fullName?.message}/>

                <EditableInput type='date' value={citizen.birthDate} label='Дата Рождения' isEditing={isEditing} placeholder='Введите дату'
                register={register('birthDate', {
                    required: 'Дата рождения обязательна'
                })} error={errors.birthDate?.message}/>
                
                <EditableInput value={citizen.phone} label='Телефон' isEditing={isEditing} placeholder='Введите телефон'
                register={register('phone', {
                    required: 'Телефон обязателен',
                    minLength: {
                        value: 10,
                        message: 'Телефон слишком короткий'
                    }
                })} error={errors.phone?.message}/>

                <EditableSelect value={citizen.gender} label='Пол' displayValue={citizen.gender === 'male'? 'Мужской' : 'Женский'} isEditing={isEditing}
                register={register('gender', {
                    required: 'Пол обязателен'
                })}
                error={errors.gender?.message}
                options={[
                    {value: 'male', label: 'Мужской'},
                    {value: 'female', label: 'Женский'}
                ]} />
                
                <EditableInput type='email' value={citizen.email} label='Почта' isEditing={isEditing} placeholder='Введите почту'
                register={register('email', {
                    required: 'Почта обязательна',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Неверный формат почты'
                    }
                })} error={errors.email?.message}/>

                <EditableInput value={citizen.city} label='Город' isEditing={isEditing} placeholder='Введите город'
                register={register('city', {
                    required: 'Город обязателен',
                    minLength: {
                        value: 2,
                        message: 'Город должен содержать минимум 2 символа'
                    }
                })} error={errors.city?.message}/>

                <EditableInput value={citizen.socialCategory} label='Социальная категория' isEditing={isEditing} placeholder='Введите соц. категорию'
                register={register('socialCategory', {
                    required: 'Социальная категория обязательна',
                })} error={errors.socialCategory?.message}/>

                <EditableSelect value={citizen.status} label='Статус' displayValue={citizen.status === 'active' ? 'Активен' : citizen.status === 'archived' ? 'Архив' : 'На проверке'} isEditing={isEditing}
                register={register('status', {
                    required: 'Статус обязателен'
                })}
                error={errors.status?.message}
                options={[
                    {value: 'active', label: 'Активен'},
                    {value: 'archived', label: 'Архив'},
                    {value: 'pending', label: 'На проверке'}
                ]}/>

                <EditableInput value={citizen.address} label='Адрес' isEditing={isEditing} placeholder='Введите адрес' register={register('address')} error={errors.address?.message}/>

                <EditableInput value={citizen.snils} label='СНИЛС' isEditing={isEditing} placeholder='Введите СНИЛС' register={register('snils')} error={errors.snils?.message}/>

                <EditableInput value={citizen.inn} label='ИНН' isEditing={isEditing} placeholder='Введите ИНН' register={register('inn')} error={errors.inn?.message}/>
            </div>

            {errorMessage && <p>{errorMessage}</p>}
            {isEditing ? (
                <div>
                    <button type='submit' disabled={isPending}>{isPending ? 'Сохранение...' : 'Сохранить'}</button>
                    <button type='button' onClick={onCancelEditing} disabled={isPending}>Отменить</button>
                </div>
            ) : (
                <div>
                    <button type='button' onClick={onStartEditing}>Редактировать</button>
                </div>
            )}
        </form>
    )
}
