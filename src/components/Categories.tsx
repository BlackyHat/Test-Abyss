import React, { useState } from 'react';
import { ICategory } from './App';
import Input from './Input';

interface INestedState {
  [key: string]: boolean;
}
interface ICategoriesProps {
  data: ICategory[];
  //   className?: string;
  //   onClose?: () => void; //TODO:
  //   addSubCategory: (v: string) => void;
}
const RecursiveCategories: React.FC<ICategoriesProps> = ({ data }) => {
  const className = 'subcategory';
  const [showNested, setShowNested] = useState<INestedState>({});

  if (data.length === 0) {
    return null;
  }

  const toggleNested = (label: string) => {
    setShowNested({ ...showNested, [label]: !showNested[label] });
  };

  const addCategory = () => {
    return;
  };

  return (
    <>
      {data.map(({ label, subCategories }, idx) => (
        <div key={idx} className="card" style={{ border: '1px solid red' }}>
          <div className="category_wrapper">
            <p className={`label category ${className}`}>{label}</p>
            <div className="actions">
              <button
                onClick={() => toggleNested(label)}
                className="button add"
              >
                <span className="buttonIcon">+</span>
              </button>
              <button onClick={() => {}} className="button edit">
                <span className="buttonIcon">/</span>
              </button>
              <button onClick={() => {}} className="button delete">
                <span className="buttonIcon">X</span>
              </button>
            </div>
          </div>
          <ul className="subcategories list">
            {subCategories.length > 0 && (
              <RecursiveCategories data={subCategories} />
            )}

            {showNested[label] && (
              <div className="card" style={{ border: '1px solid red' }}>
                <Input
                  onClose={() => toggleNested(label)}
                  addCategory={addCategory}
                />
              </div>
            )}
          </ul>
        </div>
      ))}
    </>
  );
};

export default RecursiveCategories;
