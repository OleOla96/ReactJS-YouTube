import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

import HeaderOnly from './layouts/HeaderOnly';
import MainLayout from './layouts/MainLayout';
import RequireAuth from './pages/RequireAuth';
import PersistLogin from './pages/PersistLogin';

import Login from './pages/LoginRegister/Login';
import Register from './pages/LoginRegister/Register';
import Home from './pages/Home';
import WatchVideoPublic from './pages/Watch/Public';
import CreateContent from './pages/Channel/CreateContent';
import UploadContent from './pages/Channel/UploadContent';
import MyChannel from './pages/Channel/MyChannel';
import WatchVideoPrivate from './pages/Watch/Private';
import ManageVideos from './pages/Channel/ManageVideos';
import Admin from './pages/Roles/Admin';
import Moderator from './pages/Roles/Moderator';
import Unauthorized from './pages/Unauthorized';
import Missing from './pages/Missing';
import DetailContent from './pages/Channel/DetailContent';
// prettier-ignore
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<HeaderOnly><Register /></HeaderOnly>} />
        <Route element={<PersistLogin />}>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/watch/:linkVideo" element={<HeaderOnly><WatchVideoPublic /></HeaderOnly>} />
          <Route element={<RequireAuth allowedRoles={['user']} />}>
            <Route path="/create-link" element={<HeaderOnly><CreateContent /></HeaderOnly>} />
            <Route path="/upload" element={<HeaderOnly><UploadContent /></HeaderOnly>} />
            <Route path="/managevideos">
              <Route index element={<HeaderOnly><ManageVideos /></HeaderOnly>} />
              <Route path="detail/:id" element={<HeaderOnly><DetailContent /></HeaderOnly>} />
            </Route>
            <Route path="/channel">
              <Route index element={<MainLayout><MyChannel /></MainLayout>} />
              <Route path="watch/:linkVideo" element={<HeaderOnly><WatchVideoPrivate /></HeaderOnly>} />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path="/admin" element={<HeaderOnly><Admin /></HeaderOnly>} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['moderator']} />}>
            <Route path="/moderator" element={<HeaderOnly><Moderator /></HeaderOnly>} />
          </Route>
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<MainLayout><Missing /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
