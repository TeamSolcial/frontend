import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { Footer } from './components/layout/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}

export default App