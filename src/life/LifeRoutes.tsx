import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LifeHomePage } from './pages/LifeHomePage';
import { RegionPage } from './pages/RegionPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { PublishPage } from './pages/PublishPage';
import { AdminPage } from './pages/AdminPage';

export const LifeRoutes: React.FC = () => (
  <Routes>
    <Route index element={<LifeHomePage />} />
    <Route path="admin" element={<AdminPage />} />
    <Route path=":region" element={<RegionPage />} />
    <Route path=":region/publish" element={<PublishPage />} />
    <Route path=":region/post/:id" element={<PostDetailPage />} />
  </Routes>
);
