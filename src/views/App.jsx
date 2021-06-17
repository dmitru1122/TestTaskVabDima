import { Suspense, lazy, React } from 'react';

import '../theme/main.scss';

const Header = lazy(() => import('../components/main-layout/header/Header'));
const Footer = lazy(() => import('../components/main-layout/footer/Footer'));
const HomePage = lazy(() => import('../components/pages/home-page/HomePage'));

function App() {
  return (
    <div className='App'>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
