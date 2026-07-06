import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from '@tanstack/react-table'
import type { CitizenStatus, Gender, Citizen } from '../../types/citizenType'
import styles from './RecentCitizensTable.module.css'
import formatDate from '../../utils/ruDate'
import getAge from '../../utils/getAge'

type Props = {
    citizens: Citizen[]
}

const statusLabels: Record<CitizenStatus, string> = {
    active: 'Активен',
    pending: 'На проверке',
    archived: 'Архив',
}

const genderLabels: Record<Gender, string> = {
    male: 'Мужской',
    female: 'Женский',
}

export default function RecentCitizensTable({citizens}: Props) {
    const [sorting, setSorting] = useState<SortingState>([])

    const columns = useMemo<ColumnDef<Citizen>[]>(
        () => [
            {
                accessorKey: 'fullName',
                header: 'ФИО'
            },
            {
                id: 'age',
                header: 'Возраст',
                accessorFn: (citizen) => getAge(citizen.birthDate),
                cell: ({getValue}) => `${getValue<number>()} лет`
            },
            {
                accessorKey: 'gender',
                header: 'Пол',
                cell: ({row}) => genderLabels[row.original.gender]
            },
            {
                accessorKey: 'city',
                header: 'Город'
            },
            {
                accessorKey: 'socialCategory',
                header: 'Социальная категория'
            },
            {
                accessorKey: 'status',
                header: 'Статус',
                cell: ({row}) => (
                    <span className={`${styles.statusBadge} ${styles[row.original.status]}`}>
                        {statusLabels[row.original.status]}
                    </span>
                )
            },
            {
                accessorKey: 'registrationDate',
                header: 'Дата учета',
                cell: ({row}) => formatDate(row.original.registrationDate)
            },
            {
                id: 'actions',
                header: '',
                enableSorting: false,
                cell: ({row}) => (
                    <Link className={styles.detailsLink} to={`/citizens/${row.original.id}`}>
                        Подробнее
                    </Link>
                )
            }
        ], []
    )
    const table = useReactTable({
        data: citizens,
        columns,
        state: {
            sorting
        },

        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className={styles.tableWrapper}>
            <h2>Последние добавленные граждане</h2>
            <table className={styles.table}>
                <thead>
                    {table.getHeaderGroups().map((headerGroup)=>(
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header)=> {
                                const sortDirection = header.column.getIsSorted()
                                const sortIcon = sortDirection === 'asc' ? ' ↑' : sortDirection === 'desc' ? ' ↓' : ''

                                return (
                                    <th key={header.id}>
                                        {header.isPlaceholder ? null : (
                                            header.column.getCanSort() ? (
                                                <button className={styles.sortButton} type="button" onClick={header.column.getToggleSortingHandler()}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {sortIcon}
                                                </button>
                                            ) : (
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            )
                                        )}
                                    </th>
                                )
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.original.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
