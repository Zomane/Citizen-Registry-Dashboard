import express from 'express'
import cors from 'cors'
import { type Citizen, type UpdateCitizenDto } from './types/citizen'
import { initialCitizens } from './data/citizens'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

let citizens: Citizen[] = [...initialCitizens]

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`)
})

app.get('/citizens', (req, res) => {
    res.json(citizens)
})

app.get('/citizens/:id', (req, res) => {
    const citizen = citizens.find(citizen => citizen.id === req.params.id)

    if(!citizen){
        return res.status(404).json({
            message: 'Гражданин не найден'
        })
    }

    res.json(citizen)
}) 

app.patch('/citizens/:id', (req, res) => {
    const citizenIndex = citizens.findIndex((citizen) => citizen.id === req.params.id)

    if (citizenIndex === -1) {
        return res.status(404).json({
            message: 'Гражданин не найден',
        })
    }

    const updatedInfo: UpdateCitizenDto = req.body
    
    if (updatedInfo.fullName !== undefined && updatedInfo.fullName.trim().length < 3) {
        return res.status(400).json({
            message: 'ФИО должно содержать минимум 3 символа',
        })
    }

    if (updatedInfo.email !== undefined && !updatedInfo.email.includes('@')) {
        return res.status(400).json({
            message: 'Введите корректный email',
        })
    }

    if (updatedInfo.birthDate !== undefined) {
        const birthDate = new Date(updatedInfo.birthDate)
        const today = new Date()

        if (birthDate > today) {
            return res.status(400).json({
                message: 'Дата рождения не может быть в будущем',
            })
        }
    }

    if (updatedInfo.city !== undefined && updatedInfo.city.trim().length < 2) {
        return res.status(400).json({
            message: 'Город должен содержать минимум 2 символа',
        })
    }

    const updatedCitizen: Citizen = {
        ...citizens[citizenIndex],
        ...updatedInfo
    }
    citizens[citizenIndex] = updatedCitizen

    res.json(updatedCitizen)
})