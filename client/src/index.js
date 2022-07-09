import { Routes, Route } from 'react-router-dom';
import { React } from 'react';
import { HashRouter } from 'react-router-dom'
import NavHeader from './components/navigation/TopNavigation.js';
import BottomFooter from './components/navigation/BottomFooter.js';

import ReactDOM from "react-dom/client";
import Home from './pages/Home';
import Projects from './pages/Projects';
import HallOfFame from './pages/HallOfFame';
import Skinpack from './pages/RegenSkins';
import AddDonator from './pages/admin/AddDonator';
import AdminDonators from './pages/admin/AdminDonators';
import Dashboard from './pages/Dashboard';
import CreateFrame from './pages/CreateFrame';
import UploadSkin from './pages/admin/UploadSkin';
import Fortnite from './pages/fortnite';

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(

  <HashRouter>
    <NavHeader />
    <Routes>
      // Admin 
      <Route path="a/add-vip" element={<AddDonator />} />
      <Route path="a/donators" element={<AdminDonators />} />

      // User 
      <Route path="u/dashboard" element={<Dashboard />} />

      // Public 
      <Route path="/" element={<Home />} />
      <Route path="projects" element={<Projects />} />
      <Route path="hall-of-fame" element={<HallOfFame />} />
      <Route path="skins" element={<Skinpack />} />
      
      <Route path="frame-maker" element={<CreateFrame />} />
      <Route path="upload-skin" element={<UploadSkin />} />
      <Route path="fortnite" element={<Fortnite />} />

    </Routes>
    <BottomFooter />

  </HashRouter>
);
