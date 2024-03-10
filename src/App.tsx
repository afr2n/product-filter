import './App.css'
import Header from '@/components/Header'
import ProductFilter from '@/components/ProductFilter'
function App() {
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <ProductFilter />
      </div>
    </>
  )
}

export default App
