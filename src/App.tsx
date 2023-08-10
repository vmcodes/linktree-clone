import { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BackToTop from './components/BackToTop';
import { useAuth } from './context';
const Home = lazy(() => import('./pages/Home'));
const SignIn = lazy(() => import('./pages/SignIn'));
const Account = lazy(() => import('./pages/Account'));
const Profile = lazy(() => import('./pages/Profile'));

const App: FC = () => {
  const user = useAuth();

  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/:slug" element={<Profile />} />

          {user.auth && <Route path="/account" element={<Account />} />}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <BackToTop />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
