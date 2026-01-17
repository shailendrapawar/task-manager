import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { RootLayout } from './layouts/RootLayout.jsx'
import Home from './pages/home/Home.jsx'
import { Board } from './pages/board/Board.jsx'
import ThemeProvider from './contexts/theme/ThemeProvider.jsx'
import { Toaster } from "react-hot-toast"
import TaskProvider from './contexts/tasks/TaskProvider.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<RootLayout />} >

    <Route index element={<Home />} />
    <Route path="boards/:id/:name" element={<Board />} />

  </Route>

))
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster />
      <TaskProvider>
        <RouterProvider router={router} >

        </RouterProvider>
      </TaskProvider>


    </ThemeProvider>
  </StrictMode>,
)
