import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home/Home';
import { CreateJob } from './pages/CreateJob/CreateJob';
import { News } from './pages/News/News';
import { Login } from './pages/Login/Login';
import { Profile } from './pages/Profile/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="create-job" element={<CreateJob />} />
        <Route path="news" element={<News />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Login />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
