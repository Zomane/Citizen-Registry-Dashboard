import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from "@tanstack/react-table"
import type { EducationInfo, EmploymentHistoryItem, EmploymentInfo } from "../../types/citizenType"
import { useMemo, useState } from "react"
import styles from './CitizenEducationEmployment.module.css'
import EmptyState from "../ui/EmptyState"

type Props = {
    employment: EmploymentInfo,
    education: EducationInfo,
    employmentHistory: EmploymentHistoryItem[]
}

const tablePaginationSizes = [10, 25, 50, 100]

export default function CitizenEducationEmployment({employment, education, employmentHistory}: Props){
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10
    })
    const [sorting, setSorting] = useState<SortingState>([])

    const columns = useMemo<ColumnDef<EmploymentHistoryItem>[]>(
        () => [
            {
                accessorKey: 'company',
                header: 'Компания'
            },
            {
                accessorKey: 'position',
                header: 'Должность'
            },
            {
                accessorKey: 'period',
                header: 'Период'
            },
            {
                accessorKey: 'status',
                header: 'Статус',
                cell: ({row}) => <span className={row.original.status === 'Активно' ? styles.active : styles.finished}>{row.original.status}</span>
            }
        ], []
    )

    const table = useReactTable({
        data: employmentHistory,
        columns,
        state: {
            pagination,
            sorting
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,

        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className={styles.employmentSection}>
            <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
                <h3>Образование</h3>
                <p>Уровень образования: {education.level}</p>
                <p>Учебное заведение: {education.institution}</p>
                <p>Специальность: {education.specialty}</p>
            </div>
            <div className={styles.infoCard}>
                <h3>Текущая занятость</h3>
                <p>Статус занятости: {employment.status}</p>
                <p>Компания: {employment.company || '-'}</p>
                <p>Должность: {employment.position || '-'}</p>
                <p>Категория дохода: {employment.incomeCategory}</p>
            </div>
            </div>
            <div className={styles.historyCard}>
                <h3>История занятости</h3>
                {employmentHistory.length === 0 ? <EmptyState title='История занятости не добавлена'/> : (
                    <>
                    <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
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
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => (
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
                        <label className={styles.pageSizeLabel}>
                            Показывать:
                            <select className={styles.pageSizeSelect} value={table.getState().pagination.pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
                                {tablePaginationSizes.map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>{pageSize}</option>
                                ))}
                            </select>
                        </label>
                        <button className={styles.pageButton} onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>{'<<'}</button>
                        <button className={styles.pageButton} onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>{'<'}</button>
                        <span>Страница {table.getState().pagination.pageIndex + 1} из {table.getPageCount()}</span>
                        <button className={styles.pageButton} onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>{'>'}</button>
                        <button className={styles.pageButton} onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>{'>>'}</button>
                    </div>   
                    </>
                )}
            </div>

        </div>
    )
}
