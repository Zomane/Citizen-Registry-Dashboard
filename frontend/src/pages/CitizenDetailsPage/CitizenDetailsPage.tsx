import { Link, useParams } from 'react-router-dom'
import useCitizenById from '../../hooks/useCitizenById'
import styles from './CitizenDetails.module.css'
import ErrorState from '../../components/ui/ErrorState'
import Loader from '../../components/ui/Loader'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { Citizen, UpdateCitizenDto } from '../../types/citizenType'
import useUpdateCitizen from '../../hooks/useUpdateCitizen'
import profileMalePicture from '../../assets/profile-male-picture.png'
import ProfileFemalePicture from '../../assets/profile-female-picture.png'
import CitizenDetailsForm from '../../components/citizens/CitizenDetailsForm'

function getDefaultValues(citizen: Citizen): UpdateCitizenDto {
    return {
        fullName: citizen.fullName,
        birthDate: citizen.birthDate,
        gender: citizen.gender,
        phone: citizen.phone,
        email: citizen.email,
        city: citizen.city,
        address: citizen.address,
        socialCategory: citizen.socialCategory,
        status: citizen.status,
        snils: citizen.snils,
        inn: citizen.inn,
    }
}

export default function CitizenDetailsPage(){
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const {id} = useParams()

    const updateMutation = useUpdateCitizen(id ?? '')
    const {data: citizen, isError, error, isLoading} = useCitizenById(id ?? '')

    const {register, handleSubmit, reset, formState: {errors}} = useForm<UpdateCitizenDto>()

    useEffect(() => {
        if(citizen){
            reset(getDefaultValues(citizen))
        }
    }, [reset, citizen])

    function cancelEditing(){
        if(citizen){
            reset(getDefaultValues(citizen))
        }
        setIsEditing(false)
    }
    
    function onSubmit(formData: UpdateCitizenDto){
        updateMutation.mutate(formData, {
            onSuccess: () => {
                setIsEditing(false)
            }
        })
    }


    if (!id) {
        return <ErrorState errorTitle="Некорректный адрес" errorMessage="ID гражданина не указан" />
    }

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return (
            <ErrorState errorTitle="Не удалось загрузить карточку гражданина" errorMessage={error instanceof Error ? error.message : 'Ошибка сервера'} />
        )
    }

    if (!citizen) {
        return (
            <ErrorState errorTitle="Гражданин не найден" errorMessage="Возможно, запись была удалена или указан неверный адрес" />
        )
    }

    return (
        <div>
            <Link to='/citizens'>← Вернуться в картотеку</Link>
            <div className={styles.generalCitizenInfo}>
                <img src={citizen.gender === 'male' ? profileMalePicture : ProfileFemalePicture} width={200} height={200} alt='Изображение профиля'/>
                <h1>{citizen.fullName}</h1>
                <p>{citizen.birthDate} · {citizen.city} · {citizen.status === 'active' ? 'Активен' : citizen.status ==='archived' ? 'Архив' : 'На проверке'}</p>
                <CitizenDetailsForm
                    citizen={citizen}
                    isEditing={isEditing}
                    isPending={updateMutation.isPending}
                    errorMessage={updateMutation.isError ? (updateMutation.error instanceof Error ? updateMutation.error.message : 'Не удалось сохранить изменения') : undefined}
                    errors={errors}
                    register={register}
                    onSubmit={handleSubmit(onSubmit)}
                    onCancelEditing={cancelEditing}
                    onStartEditing={() => setIsEditing(true)}
                />
            </div>
        </div>
    )
}
