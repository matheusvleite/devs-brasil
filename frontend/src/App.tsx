import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <h2>Header</h2>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <h2>Footer</h2>
      </BrowserRouter>
    </div>
  )
}

export default App
