import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Footer, Header } from '@/features/layout/components';

const Profile = lazy(() => import('@/pages/Profile'));
const Contact = lazy(() => import('@/pages/Contact'));
const Blog = lazy(() => import('@/pages/Blog'));
const Projects = lazy(() => import('@/pages/Projects'));

const AppLayout = () => (
  <Suspense>
    <div className="min-h-lvh">
      <Header />
      <div
        className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-lvw h-full flex flex-col"
        style={{ minHeight: 'calc(100vh - 8rem)' }}
      >
        <main className="flex-1 overflow-x-hidden overflow-y-auto mx-auto p-6">
          <ScrollArea>
            <Outlet />
          </ScrollArea>
        </main>
      </div>
      <Footer />
    </div>
  </Suspense>
);

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        <Route path="/" element={<Profile />} />
        <Route path="/about" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/projects" element={<Projects />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
