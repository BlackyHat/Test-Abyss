import { useState, useContext } from 'react';
import RecursiveCategories from './Categories';
import { CategoryContext } from '../context/CategoryContext';

import Input from './Input';
import Button from './Button';
import AddIcon from '../assets/add.svg?react';

function App() {
  const [showNested, setShowNested] = useState(false);
  const { categories } = useContext(CategoryContext);

  const toggleNested = () => {
    setShowNested(!showNested);
  };

  return (
    <>
      <div className="wrapper">
        <div className="inner">
          <p className="label">Categories</p>
          <div className="actions main">
            <Button
              onClick={toggleNested}
              className="add"
              ariaLabel="Add the category"
            >
              <AddIcon className="buttonIcon" />
            </Button>
          </div>
        </div>
      </div>

      <ul className="list">
        <RecursiveCategories data={categories} />
        {showNested && (
          <li className="card">
            <Input onClose={toggleNested} />
          </li>
        )}
      </ul>
    </>
  );
}

export default App;
