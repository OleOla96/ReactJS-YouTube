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
import WatchVideoPrivate from './pages/Watch/Private';
import CreateContent from './pages/Channel/CreateContent';
import UploadContent from './pages/Channel/UploadContent';
import MyChannel from './pages/Channel/MyChannel';
import ManageMyVideos from './pages/Channel/ManageVideos';
import DetailContent from './pages/Channel/DetailContent';
import ManageUsers from './pages/Roles/ManageUsers';
import ManageVideos from './pages/Roles/ManageVideos';
import Unauthorized from './pages/Unauthorized';
import Development from './pages/Development';
import Missing from './pages/Missing';
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
          <Route element={<RequireAuth allowedRoles={['user','moderator','admin']} />}>
            <Route path="/create-link" element={<HeaderOnly><CreateContent /></HeaderOnly>} />
            <Route path="/upload" element={<HeaderOnly><UploadContent /></HeaderOnly>} />
            <Route path="/manage-my-videos">
              <Route index element={<HeaderOnly><ManageMyVideos /></HeaderOnly>} />
              <Route path="detail/:id" element={<HeaderOnly><DetailContent /></HeaderOnly>} />
            </Route>
            <Route path="/channel">
              <Route index element={<MainLayout><MyChannel /></MainLayout>} />
              <Route path="watch/:linkVideo" element={<HeaderOnly><WatchVideoPrivate /></HeaderOnly>} />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path="/manage-users" element={<HeaderOnly><ManageUsers /></HeaderOnly>} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['moderator','admin']} />}>
            <Route path="/manage-videos" element={<HeaderOnly><ManageVideos /></HeaderOnly>} />
          </Route>
        </Route>
        <Route path="/shorst" element={<MainLayout><Development /></MainLayout>} />
        <Route path="/subscriptions" element={<MainLayout><Development /></MainLayout>} />
        <Route path="/history" element={<MainLayout><Development /></MainLayout>} />
        <Route path="/yourvideos" element={<MainLayout><Development /></MainLayout>} />
        <Route path="/watchlater" element={<MainLayout><Development /></MainLayout>} />
        <Route path="/yourclips" element={<MainLayout><Development /></MainLayout>} />
        <Route path="/likedvideos" element={<MainLayout><Development /></MainLayout>} />
        <Route path="/trending" element={<MainLayout><Development /></MainLayout>} />
        <Route path="/music" element={<MainLayout><Development /></MainLayout>} />
        <Route path="/gaming" element={<MainLayout><Development /></MainLayout>} />
        <Route path="/news" element={<MainLayout><Development /></MainLayout>} />
        <Route path="/sport" element={<MainLayout><Development /></MainLayout>} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<MainLayout><Missing /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
