import { Link, useParams } from 'react-router-dom'
import useCitizenById from '../../hooks/useCitizenById'
import styles from './CitizenDetails.module.css'
import ErrorState from '../../components/ui/ErrorState'
import Loader from '../../components/ui/Loader'
import { useEffect, useState, type MouseEvent } from 'react'
import { useForm } from 'react-hook-form'
import type { Citizen, UpdateCitizenDto } from '../../types/citizenType'
import useUpdateCitizen from '../../hooks/useUpdateCitizen'
import CitizenDetailsForm from '../../components/citizens/CitizenDetailsForm'
import CitizenDocuments from '../../components/citizens/CitizenDocuments'
import CitizenFamily from '../../components/citizens/CitizenFamily'
import CitizenEducationEmployment from '../../components/citizens/CitizenEducationEmployment'
import formatDate from '../../utils/ruDate'

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
        inn: citizen.inn
    }
}

export default function CitizenDetailsPage(){
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const {id} = useParams()
    const [activeTab, setActiveTab] = useState<'mainInfo' | 'documents' | 'family' | 'employment'>('mainInfo')

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

    function onEditing(e: MouseEvent<HTMLButtonElement>){
        e.preventDefault()
        setIsEditing(true)
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

    const statusLabel = citizen.status === 'active' ? 'Активен' : citizen.status === 'archived' ? 'Архив' : 'На проверке'

    return (
        <div className={styles.detailsPage}>
            <Link className={styles.backLink} to='/citizens'>← Вернуться в картотеку</Link>
            <section className={styles.generalCitizenInfo}>
                <div className={styles.detailsHeader}>
                    <div>
                        <span className={styles.headerLabel}>Карточка гражданина</span>
                        <h1>{citizen.fullName}</h1>
                        <p>{formatDate(citizen.birthDate)} · {citizen.city} · {statusLabel}</p>
                    </div>
                </div>
                <div className={styles.tabs}>
                    <button className={activeTab === 'mainInfo' ? styles.activeTab : styles.tabButton} type='button' onClick={() => setActiveTab('mainInfo')}>Основная информация</button>
                    <button className={activeTab === 'documents' ? styles.activeTab : styles.tabButton} type='button' onClick={() => setActiveTab('documents')}>Документы</button>
                    <button className={activeTab === 'family' ? styles.activeTab : styles.tabButton} type='button' onClick={() => setActiveTab('family')}>Семья</button>
                    <button className={activeTab === 'employment' ? styles.activeTab : styles.tabButton} type='button' onClick={() => setActiveTab('employment')}>Образование и занятость</button>
                </div>

                <div className={styles.tabContent}>
                {activeTab==='mainInfo' ? (
                    <CitizenDetailsForm
                        citizen={citizen}
                        isEditing={isEditing}
                        isPending={updateMutation.isPending}
                        errorMessage={updateMutation.isError ? (updateMutation.error instanceof Error ? updateMutation.error.message : 'Не удалось сохранить изменения') : undefined}
                        errors={errors}
                        register={register}
                        onSubmit={handleSubmit(onSubmit)}
                        onCancelEditing={cancelEditing}
                        onStartEditing={onEditing}
                    />
                ) : activeTab === 'documents' ? (
                    <CitizenDocuments documents={citizen.documents} />
                ) : activeTab === 'family' ? (
                    <CitizenFamily family={citizen.family} />
                ) : (
                    <CitizenEducationEmployment employment={citizen.employment} employmentHistory={citizen.employmentHistory} education={citizen.education} />
                )}
                </div>
            </section>
        </div>
    )
}
