import { useState, useContext } from 'react';
import RecursiveCategories from './Categories';

import Input from './Input';
import { CategoryContext } from '../../context/CategoryContext';

import './App.css';

function App() {
  const [showNested, setShowNested] = useState(false);
  const { categories } = useContext(CategoryContext);

  const toggleNested = () => {
    setShowNested(!showNested);
  };

  return (
    <>
      <div className="wrapper">
        <div className="category_wrapper">
          <p className="label">Categories</p>
          <div className="actions main">
            <button
              onClick={toggleNested}
              className="button add"
              aria-label="Add category"
            >
              <span className="buttonIcon">+</span>
            </button>
          </div>
        </div>
      </div>

      <section>
        <ul className="list">
          <RecursiveCategories data={categories} />
          {showNested && (
            <li className="card" style={{ border: '1px solid red' }}>
              <Input onClose={toggleNested} />
            </li>
          )}
        </ul>
      </section>
    </>
  );
}

export default App;
