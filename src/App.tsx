import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ZenShot } from './tools/zenshot';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zenshot" element={<ZenShot />} />
      </Routes>
    </BrowserRouter>
  );
}
