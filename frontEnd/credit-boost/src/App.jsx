import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
import Communities from './pages/Communities'
import CommunityPage from './pages/CommunityPage'
import CreditScore from './pages/CreditScore'
import UploadData from './pages/UploadData'
import PrivateRoute from './middleware/PrivateRoute'
import Learn from './pages/Academy/Learn'
import Quiz from './pages/Academy/Quiz'
import TopicQuizzes from './pages/Academy/TopicQuizzes'
import AccountSetting from './pages/AccountSetting'
import Games from './pages/Games'
import TransactionDashboard from './pages/TransactionDashboard'
import CreditDataView from './pages/CreditDataView'
import DataChatInterface from './pages/DataCahtInterface'
import MicroFinance from './pages/MicroFinance/MicroFinance'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <div className='text-sm'>
      <div>
        <Router>
          <AppProvider>
          <Toaster />
            {/* <TopProgressBar /> */}
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/auth/google' element={<GoogleAuth />} />
              <Route path="/activation/:uid/:token" element={<VerifyEmail />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path="/password-reset/:uid/:token" element={<ResetPassword />} />

              <Route element={<PrivateRoute />}>
                <Route path='/dashboard' element={<Home />} />
                <Route path='/credit-score' element={<CreditScore />} />
                <Route path='/credit-score/upload-data' element={<UploadData />} />
                <Route path='/credit-score/transactions/:uploadId?' element={<TransactionDashboard />} />
                <Route path='/learn' element={<Learn />} />
                <Route path='/data-talk' element={<DataChatInterface />} />

                <Route path='/micro-finance' element={<MicroFinance />} />

                <Route path='/learn/topics/:topicId/quizzes' element={<TopicQuizzes />} />
                <Route path='/learn/topics/quiz/:quizId' element={<Quiz />} />

                <Route path='/games' element={<Games />} />

                <Route path='/communities' element={<Communities />} />

                <Route path='/credit-data-view' element={<CreditDataView />} />

                <Route path='/communities/:id' element={<CommunityPage />} />

                <Route path='/account-settings' element={<AccountSetting />} />
              </Route>
            </Routes>
          </AppProvider>
        </Router>
      </div>
    </div>
  )
}


export default App
