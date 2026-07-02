import {type Citizen, type UpdateCitizenDto} from '../types/citizenType'

const PORT = 3001
const API_URL = `http://localhost:${PORT}`

export async function getCitizens(): Promise<Citizen[]> {
    const res = await fetch(`${API_URL}/citizens`)

    if(!res.ok){
        const errorData = await res.json()
        throw new Error(errorData.message || 'Ошибка сервера')
    }

    return await res.json()
}

export async function getCitizenById(id: string): Promise<Citizen | null> {
    const res = await fetch(`${API_URL}/citizens/${id}`)

    if (res.status === 404) {
        return null
    }

    if(!res.ok){
        const errorData = await res.json()
        throw new Error(errorData.message || 'Ошибка сервера')
    }

    return await res.json()
}

export async function patchCitizen(id: string, data: UpdateCitizenDto): Promise<Citizen> {
    const res = await fetch(`${API_URL}/citizens/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })

    if(!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Ошибка сервера')
    }

    return await res.json()
}