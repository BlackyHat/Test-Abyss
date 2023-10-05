import { useState } from 'react';
import './App.css';
import RecursiveCategories from './Categories';
import Input from './Input';

export interface ICategory {
  label: string;
  subCategories: ICategory[];
}

// const initialState = { label: 'Categories', subCategories: [] };

function App() {
  const [categories, setCategories] = useState<ICategory[]>([
    { label: 'Categories1', subCategories: [] },
    { label: 'Categories5', subCategories: [] },
    {
      label: 'CategoriesLast',
      subCategories: [
        { label: 'Last1', subCategories: [] },
        {
          label: 'Last2',
          subCategories: [{ label: 'Last1', subCategories: [] }],
        },
        // {
        //   label: 'Last3',
        //   subCategories: [
        //     {
        //       label: '2023',
        //       subCategories: [
        //         {
        //           label: '1962',
        //           subCategories: [{ label: 'Last22', subCategories: [] }],
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
    },
  ]);
  const [showNested, setShowNested] = useState(false);

  const addCategory = (label: string) => {
    console.log('LABEL', label);

    setCategories((prevCats) => [...prevCats, { label, subCategories: [] }]);
  };
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
              onClick={toggleNested} //TODO:
              className="button add"
              aria-label="Add category"
            >
              <span className="buttonIcon">+</span>
            </button>
          </div>
        </div>
      </div>
      <section>
        <ul className="subcategories list">
          <RecursiveCategories data={categories} />
          {showNested && (
            <div className="card" style={{ border: '1px solid red' }}>
              <Input onClose={toggleNested} addCategory={addCategory} />
            </div>
          )}
        </ul>
      </section>
    </>
  );
}

export default App;
