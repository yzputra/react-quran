import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import SurahPage, { surahLoader} from './pages/SurahPage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { 
          path: '/',
          element: <HomePage />
        },
        {
          path: '/surah/:num',
          element: <SurahPage />,
          loader: surahLoader,
        },
      ]
    }
  ]);

  return <RouterProvider router={router} />
}

export default App;
