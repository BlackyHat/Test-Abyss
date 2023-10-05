import React, { useState } from 'react';
import { ICategory } from './App';
import Input from './Input';

interface INestedState {
  [key: string]: boolean;
}
interface ICategoriesProps {
  data: ICategory[];
}
const RecursiveCategories: React.FC<ICategoriesProps> = ({ data }) => {
  const [showNested, setShowNested] = useState<INestedState>({});
  const [activeInput, setActiveInput] = useState<INestedState>({});

  if (data.length === 0) {
    return null;
  }

  const toggleNested = (label: string) => {
    setShowNested({ ...showNested, [label]: !showNested[label] });
  };

  const toggleActiveInput = (label: string) => {
    setActiveInput({ ...activeInput, [label]: !activeInput[label] });
  };

  const addCategory = () => {
    return;
  };

  return (
    <>
      {data.map(({ label, subCategories }, idx) => (
        <div key={idx} className="card" style={{ border: '1px solid red' }}>
          <div className="category_wrapper">
            <Input
              disabled={!activeInput[label]}
              initValue={label}
              onClose={() => {}}
              addCategory={() => {}}
            />
            {!activeInput[label] && (
              <div className="actions">
                <button
                  onClick={() => toggleNested(label)}
                  className="button add"
                  disabled={activeInput[label]}
                >
                  <span className="buttonIcon">+</span>
                </button>
                <button
                  onClick={() => toggleActiveInput(label)}
                  className="button edit"
                >
                  <span className="buttonIcon">/</span>
                </button>
                <button onClick={() => {}} className="button delete">
                  <span className="buttonIcon">X</span>
                </button>
              </div>
            )}
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
