import { useEffect, useMemo, useState } from 'react'
import styles from './Citizens.module.css'
import useCitizens from '../../hooks/useCitizens'
import type { Filters } from '../../types/citizenType'
import ErrorState from '../../components/ui/ErrorState'
import Loader from '../../components/ui/Loader'
import CitizensTable from '../../components/citizens/CitizensTable'
import EmptyState from '../../components/ui/EmptyState'

const initialFilters: Filters = {
    city: '',
    status: '',
    gender: '',
    socialCategory: '',
}

export default function CitizensPage(){
    const { data: citizens = [], isError, error, isLoading } = useCitizens()

    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')

    const [draftFilters, setDraftFilters] = useState<Filters>(initialFilters)
    const [appliedFilters, setAppliedFilters] = useState<Filters>(initialFilters)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedSearch(search)
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [search])
  
    const filteredCitizens = useMemo(() => {
        return citizens.filter((citizen) => {
            const searchValue = debouncedSearch.toLowerCase().trim()
            const cityValue = appliedFilters.city.toLowerCase().trim()
            const categoryValue = appliedFilters.socialCategory.toLowerCase().trim()

            const matchesSearch = citizen.fullName.toLowerCase().includes(searchValue)
            const matchesCity = cityValue ? citizen.city.toLowerCase().includes(cityValue) : true
            const matchesStatus = appliedFilters.status ? citizen.status === appliedFilters.status : true
            const matchesGender = appliedFilters.gender ? citizen.gender === appliedFilters.gender : true
            const matchesCategory = categoryValue ? citizen.socialCategory.toLowerCase().includes(categoryValue) : true

            return (
                matchesSearch &&
                matchesCity &&
                matchesStatus &&
                matchesGender &&
                matchesCategory
            )
        })
    }, [citizens, debouncedSearch, appliedFilters])

    function resetFilters() {
        setDraftFilters(initialFilters)
        setAppliedFilters(initialFilters)
    }

    function applyFilters() {
        setAppliedFilters(draftFilters)
    }

    function handleChangeFilter(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target

        setDraftFilters((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return (
        <ErrorState errorTitle="Не удалось загрузить картотеку" errorMessage={error instanceof Error ? error.message : 'Ошибка сервера'}/>
        )
    }

    return (
        <div className={styles.citizensPage}>
            <header className={styles.citizensHeader}>
                <h2>Картотека граждан</h2>
                <p>Список учетных карточек граждан</p>
                <div className={styles.counters}>
                    <span>Всего записей: {citizens.length}</span>
                    <span>Найдено: {filteredCitizens.length}</span>
                </div>
            </header>
            <section className={styles.filters}>
                <h3>Фильтры</h3>
                <input className={styles.searchInput} name='search' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Введите ФИО' />
                <div className={styles.filtersGrid}>
                <label className={styles.filterField}>Город
                    <input className={styles.fieldControl} name='city' value={draftFilters.city} onChange={handleChangeFilter} placeholder='Введите город'/>
                </label>
                    <label className={styles.filterField}>Статус
                        <select className={styles.fieldControl} name='status' value={draftFilters.status} onChange={handleChangeFilter}>
                            <option value=''>Любой статус</option>
                            <option value='active'>Активный</option>
                            <option value='pending'>В ожидании</option>
                            <option value='archived'>Архивирован</option>
                        </select>
                    </label>

                    <label className={styles.filterField}>Пол
                        <select className={styles.fieldControl} name='gender' value={draftFilters.gender} onChange={handleChangeFilter}>
                            <option value=''>Любой пол</option>
                            <option value='male'>Мужской</option>
                            <option value='female'>Женский</option>
                        </select>
                    </label>
                    <label className={styles.filterField}>Соц. категория
                        <input className={styles.fieldControl} name='socialCategory' value={draftFilters.socialCategory} onChange={handleChangeFilter} placeholder='Введите категорию'/>
                    </label>
                </div>
                <div className={styles.filtersActions}>
                    <button className={styles.secondaryButton} onClick={resetFilters}>Сбросить фильтры</button>
                    <button className={styles.primaryButton} onClick={applyFilters}>Применить фильтры</button>
                </div>

            </section>
            <section className={styles.tableSection}>
                <h2>Таблица граждан</h2>
                {filteredCitizens.length === 0 && (
                    <EmptyState title="По данным фильтрам ничего не найдено" />
                )}
                {filteredCitizens.length !==0 && <CitizensTable citizens={filteredCitizens} />}
            </section>
        </div>
    )
}
