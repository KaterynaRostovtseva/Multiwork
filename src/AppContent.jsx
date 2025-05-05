import React from 'react';
import { Routes, Route, useLocation,  Navigate} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header/Header.jsx';
import Landing from './pages/Landing.jsx';
import PageSignUp from './pages/PageSignUp.jsx';
import Footer from './components/Footer/Footer.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import PageCheckYourEmail from './pages/PageCheckYourEmail.jsx';
import PageLogin from './pages/PageLogin.jsx';
import PageForgotPassword from './pages/PageForgotPassword.jsx';
import PageResetYourPassword from './pages/PageResetYourPassword.jsx';
import PageSetYourNewPassword from './pages/PageSetYourNewPassword.jsx';
import PageHomeWithoutRegistration from './pages/PageHomeWithoutRegistration.jsx';
import SettingsPage from './pages/Settings.jsx';
import ConfirmationComponent from './components/ConfirmationComponent/ConfirmationComponent.jsx';
import PageMyProject from './pages/PageMyProject.jsx';
import PageAllMyProject from './pages/PageAllMyProject.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchProjects } from './store/Slice/projectSlice.js';
import { fetchSkills } from './store/Slice/skillsSlice.js';
import PageMembers from './pages/PageMembers.jsx';
import PageAboutMember from './pages/PageAboutMember.jsx';
import PageTopProjects from './pages/PageTopProjects.jsx';
import PageActiveAllProjects from './pages/PageActiveAllProjects.jsx';
import PageInProccesAllProjects from './pages/PageInProccesAllProjects.jsx';
import PageCompletedAllProjects from './pages/PageCompletedAllProjects.jsx';
import PageProjectsMember from './pages/PageProjectsMember.jsx';
import PageProjectId from './pages/PageProjectId.jsx';
import PageSuccessfulJoining from './pages/PageSuccessfulJoining.jsx';
import PageDeclined from './pages/PageDeclined.jsx';
import PageHelpCenter from './pages/PageHelpCenter.jsx';
import PageSuccessHelpCenter from './pages/PageSuccessHelpCenter.jsx';


function AppContent() {
  const location = useLocation();
  const dispatch =useDispatch();
  const [, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await Promise.all([dispatch(fetchProjects()), dispatch(fetchSkills())]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 6000); 
      }
    };

    loadData();
  }, [dispatch]);

  const showFooter = location.pathname === '/';
  
  return (
    <>
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<PageSignUp />} />
      <Route path="/checkYourEmail" element={<PageCheckYourEmail />} />
      <Route path="/login" element={<PageLogin />} />
      <Route path="/forgotPassword" element={<PageForgotPassword />} />
      <Route path="/resetYourPassword" element={<PageResetYourPassword />} />
      <Route path="/newPassword" element={<PageSetYourNewPassword />} />
      <Route path="/home/:registration" element={<PageHomeWithoutRegistration />} />
      <Route path="/pageMyProject/:id" element={<PageMyProject />} />
      <Route path="/pageProjectId/:id" element={<PageProjectId />} />
      <Route path="/pageAllMyProject" element={<PageAllMyProject />} />
      <Route path="/pageMembers" element={<PageMembers />} />
      <Route path="/pageAboutMember/:id" element={<PageAboutMember />} />
      <Route path="/pageProjectsMember" element={<PageProjectsMember />} />
      <Route path="/pageTopProjects" element={<PageTopProjects />} />
      <Route path="/pageActiveAllProjects" element={<PageActiveAllProjects />} />
      <Route path="/pageInProccesAllProjects" element={<PageInProccesAllProjects />} />
      <Route path="/pageCompletedAllProjects" element={<PageCompletedAllProjects />} />
      <Route path="/pageSuccessfulJoining/:id" element={<PageSuccessfulJoining />} />
      <Route path="/pageDeclined/:id" element={<PageDeclined />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/pageHelpCenter" element={<PageHelpCenter />} />
      <Route path="/pageSuccessHelpCenter" element={<PageSuccessHelpCenter />} />

      {/*confirmation component*/}
      <Route path="/confirmation" element={<ConfirmationComponent/>} />

   
     <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
    {showFooter && <Footer />}
  </>

  );
}

export default AppContent;