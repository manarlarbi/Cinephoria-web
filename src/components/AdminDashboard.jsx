import { Container } from '@mui/material'
import React from 'react'
import FilmsPage from './Admin/FilmsPage'
import SallesPage from './Admin/SallesPage'
import SeancesPage from './Admin/SeancePage'
import EmployePage from './Admin/EmployePage'

export default function AdminDashboard() {
  return (
    <Container>
        <h1>Admin Dashboard</h1>
        <FilmsPage />
        <SallesPage />
        <SeancesPage />
        <EmployePage />
    </Container>
  )
}
