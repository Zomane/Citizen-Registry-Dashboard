import { DashboardCategoryChart, DashboardCityChart, DashboardPieChart } from '../../components/dashboard/DashboardCharts'
import RecentCitizensTable from '../../components/dashboard/RecentCitizensTable'
import EmptyState from '../../components/ui/EmptyState'
import ErrorState from '../../components/ui/ErrorState'
import Loader from '../../components/ui/Loader'
import useCitizens from '../../hooks/useCitizens'
import type { Citizen } from '../../types/citizenType'
import getAge from '../../utils/getAge'
import styles from './Dashboard.module.css'

function getCitizensLastMonth(citizens: Citizen[]) {
  const today = new Date()
  const monthAgo = new Date()

  monthAgo.setMonth(today.getMonth() - 1)

  return citizens.filter((citizen) => {
    const registrationDate = new Date(citizen.registrationDate)

    return registrationDate >= monthAgo
  })
}

function getLastAddedCitizens(citizens: Citizen[]){
    return [...citizens].sort((first, second) => {
        return new Date(second.registrationDate).getTime() - new Date(first.registrationDate).getTime()
    }).slice(0, 5)
}

export default function DashboardPage(){
    const {data: citizens, error, isError, isLoading} = useCitizens()

    if(isLoading){
        return (
            <Loader />
        )
    }

    if(isError){
        return (
            <ErrorState errorTitle='Ошибка в загрузке граждан' errorMessage={error instanceof Error ? error.message : 'Ошибка сервера'} />
        )
    }

    if(citizens?.length === 0 || !citizens) {
        return (
            <EmptyState title='Граждане еще не добавлены'/>
        )
    }

    const activeCitizens = citizens.filter((citizen)=>citizen.status === 'active').length
    const pendingCitizens = citizens.filter((citizen)=>citizen.status === 'pending').length
    const archivedCitizens = citizens.filter((citizen)=>citizen.status === 'archived').length
    const averageAge = citizens.reduce((sum, citizen) => sum + getAge(citizen.birthDate), 0)/citizens.length
    const lastMonthCitizens = getCitizensLastMonth(citizens).length
    const lastAddedCitizens = getLastAddedCitizens(citizens)
    return (
        <div className={styles.dashboardPage}>
            <div className={styles.dashboardContent}>
                <div className={styles.metricsChartsGrid}>
                    <div className={styles.metricsCard}>
                        <h2>Ключевые показатели</h2>
                        <div className={styles.metricsList}>
                            <div className={styles.metricItem}>
                                <p>Всего граждан</p>
                                <span>{citizens?.length}</span>
                            </div>
                            <div className={styles.metricItem}>
                                <p>Активные</p>
                                <span>{activeCitizens}</span>
                            </div>
                            <div className={styles.metricItem}>
                                <p>На проверке</p>
                                <span>{pendingCitizens}</span>
                            </div>
                            <div className={styles.metricItem}>
                                <p>В архиве</p>
                                <span>{archivedCitizens}</span>
                            </div>
                            <div className={styles.metricItem}>
                                <p>Средний возраст</p>
                                <span>{averageAge.toFixed(0)}</span>
                            </div>
                            <div className={styles.metricItem}>
                                <p>Новых за месяц</p>
                                <span>{lastMonthCitizens}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.pieChartCard}>
                        <DashboardPieChart active={activeCitizens} pending={pendingCitizens} archived={archivedCitizens}/>
                    </div>
                </div>
                <div className={styles.barChartsGrid}>
                    <DashboardCategoryChart citizens={citizens} />
                    <DashboardCityChart citizens={citizens}/>
                </div>
                <div className={styles.tableCard}>
                    <RecentCitizensTable citizens={lastAddedCitizens}/>
                </div>
            </div>

        </div>
    )
}
