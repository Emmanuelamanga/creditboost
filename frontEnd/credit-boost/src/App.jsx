import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
//import ClientDashboard from './pages/Client/ClientDashboard'
import Home from './pages/Home'
import LoginPage from './pages/Login'
import './App.css'
import SignUp from './pages/SignUp'
import LandingPage from './pages/LandingPage'
import { AppProvider } from './context/AppContext'
import VerifyEmail from './pages/EmailVerify'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import GoogleAuth from './pages/GoogleAuth'
import AcademyHome from './pages/Academy/AcademyHome'
import ScoringPage from './pages/Score'

//special chat
//import GenerateLinkPage from './pages/supplier/GenerateSpecialChat'
//import SpecialChat from './pages/supplier/SpecialChat'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className='text-sm  '>
      <div className=''>
        <Router>
          <AppProvider>
            <Routes>
              
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/auth/google' element={<GoogleAuth />} />
              <Route path="/activation/:uid/:token" element={<VerifyEmail />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path="/password-reset/:uid/:token" element={<ResetPassword />} />

              {/* protected routes */}
              {/* <Route element={<PrivateRoute />}> */}
              
              <Route path='/home' element={<Home />} />
              <Route path='/score' element={<ScoringPage />} />
              <Route path='/academy' element={<AcademyHome />} />

              
              

              {/* </Route> */}

            </Routes>
          </AppProvider>
        </Router>
      </div>

    </div>
  )
}

export default App
