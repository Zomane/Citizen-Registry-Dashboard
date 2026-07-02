import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage/DashboardPage'
import CitizensPage from './pages/CitizensPage/CitizensPage'
import CitizenDetailsPage from './pages/CitizenDetailsPage/CitizenDetailsPage'
import MainLayout from './components/layout/MainLayout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path='/citizens' element={<CitizensPage />} />
        <Route path='/citizens/:id' element={<CitizenDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
