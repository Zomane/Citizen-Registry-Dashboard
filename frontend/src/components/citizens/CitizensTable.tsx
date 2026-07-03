import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from '@tanstack/react-table'
import type { CitizenStatus, Gender, Citizen } from '../../types/citizenType'
import styles from './CitizensTable.module.css'

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

const tablePageSizes = [10, 25, 50, 100]

function getAge(birthDate: string){
    const today = new Date()
    const birth = new Date(birthDate)

    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age -=1
    }

    return age
}

function formatDate(date: string) {
    return new Intl.DateTimeFormat('ru-RU').format(new Date(date))
}

export default function CitizensTable({citizens}: Props) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })

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
            sorting,
            pagination
        },

        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return (
        <div>
            <div className={styles.tableWrapper}>
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
            <div className={styles.pagination}>
                <label className={styles.pageSizeLabel}>Показывать:
                    <select className={styles.pageSizeSelect} value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
                        {tablePageSizes.map((pageSize) => (
                            <option key={pageSize} value={pageSize}>{pageSize}</option>
                        ))}
                    </select>
                </label>
                <button className={styles.pageButton} onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>{'<<'}</button>
                <button className={styles.pageButton} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{'<'}</button>
                <span className={styles.pageInfo}>Страница {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}</span>
                <button className={styles.pageButton} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{'>'}</button>
                <button className={styles.pageButton} onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>{'>>'}</button>
            </div>
        </div>
    )
}
