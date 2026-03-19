import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { ZenShot } from './tools/zenshot';
import { ZenType } from './tools/zentyping';
import { ZenReadme } from './tools/zenreadme';
import { ZenMock } from './tools/zenmock';
import { ZenDom } from './tools/zendom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/zenshot" element={<ZenShot />} />
        <Route path="/zentyping" element={<ZenType />} />
        <Route path="/zenreadme" element={<ZenReadme />} />
        <Route path="/zenmock" element={<ZenMock />} />
        <Route path="/zendom" element={<ZenDom />} />
      </Routes>
    </BrowserRouter>
  );
}
