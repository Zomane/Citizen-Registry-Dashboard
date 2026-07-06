import type { Citizen } from "../../types/citizenType"
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'
import styles from './DashboardCharts.module.css'

type Props = {
    active: number
    pending: number
    archived: number
}

function shortLabel(label: string) {
    return label.length > 15 ? `${label.trim().slice(0, 15)}...` : label
}

const pieColors = ['#19ad50', '#e79f19', '#5b5f63']

export function DashboardCategoryChart({citizens}: {citizens: Citizen[]}){
    const socialCategoryData = citizens.reduce<{ category: string; count: number }[]>((acc, citizen) => {
        const existingCategory = acc.find(
            (item) => item.category === citizen.socialCategory
        )

        if (existingCategory) {
             existingCategory.count += 1
        } else {
            acc.push({
                category: citizen.socialCategory,
                count: 1,
            })
        }
        return acc
    }, [])

    return (
        <div className={styles.chartCard}>
            <h2>Социальные категории</h2>
            <div className={styles.chartScroll}>
                <div className={styles.barChartInner}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={socialCategoryData} margin={{ top: 10, right: 16, left: 0, bottom: 16 }}>
                            <CartesianGrid stroke="#dbe3ef" strokeDasharray="3 3" />
                            <XAxis interval={0} tickFormatter={shortLabel} dataKey="category" angle={-20} textAnchor="end" height={54} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export function DashboardCityChart({citizens}: {citizens: Citizen[]}){
    const socialCityData = citizens.reduce<{ city: string; count: number }[]>((acc, citizen) => {
        const existingCity = acc.find(
            (item) => item.city === citizen.city
        )

        if (existingCity) {
             existingCity.count += 1
        } else {
            acc.push({
                city: citizen.city,
                count: 1,
            })
        }
        return acc
    }, [])

    return (
        <div className={styles.chartCard}>
            <h2>Распределение по городам</h2>
            <div className={styles.chartScroll}>
                <div className={styles.barChartInner}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={socialCityData} margin={{ top: 10, right: 16, left: 0, bottom: 16 }}>
                            <CartesianGrid stroke="#dbe3ef" strokeDasharray="3 3" />
                            <XAxis interval={0} tickFormatter={shortLabel} dataKey="city" angle={-20} textAnchor="end" height={54} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export function DashboardPieChart({active, pending, archived}: Props){
    const pieData = [
        {
            status: 'Активные',
            value: active
        },
        {
            status: 'На проверке',
            value: pending
        },
        {
            status: 'Архив',
            value: archived
        }
    ]
    return (
        <div className={styles.pieChartContent}>
            <h2>Распределение по статусам</h2>
            <div className={styles.pieChartWrapper}>
                <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                        <Pie data={pieData} dataKey='value' nameKey='status' innerRadius={58} outerRadius={96} paddingAngle={3}> 
                            {pieData.map((entry, index) => (
                                <Cell key={entry.status} fill={pieColors[index]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className={styles.pieLegend}>
                {pieData.map((item, index) => (
                    <div className={styles.pieLegendItem} key={item.status}>
                        <span style={{ backgroundColor: pieColors[index] }} />
                        <p>{item.status}: {item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
