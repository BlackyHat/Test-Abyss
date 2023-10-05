import React, { useContext, useState } from 'react';
import { CategoryContext, ICategory } from '../../context/CategoryContext';

import Input from './Input';

interface INestedState {
  [key: string]: boolean;
}
interface ICategoriesProps {
  data: ICategory[];
  parentId?: number;
}

const RecursiveCategories: React.FC<ICategoriesProps> = ({
  data,
  parentId,
}) => {
  const [showNested, setShowNested] = useState<INestedState>({});
  const [activeInput, setActiveInput] = useState<INestedState>({});
  const { deleteCategory } = useContext(CategoryContext);

  if (data.length === 0) {
    return null;
  }

  const toggleNested = (id: number) => {
    setShowNested({ ...showNested, [id]: !showNested[id] });
  };

  const toggleActiveInput = (id: number) => {
    setActiveInput({ ...activeInput, [id]: !activeInput[id] });
  };

  return (
    <>
      {data.map(({ id, label, subCategories }) => (
        <li key={id} className="card" style={{ border: '1px solid red' }}>
          <div className="category_wrapper">
            <Input
              disabled={!activeInput[id]}
              initValue={label}
              categoryId={id}
              parentId={parentId}
              onClose={() => toggleActiveInput(id)}
            />
            {!activeInput[id] && (
              <div className="actions">
                <button
                  onClick={() => toggleNested(id)}
                  className="button add"
                  disabled={activeInput[label]}
                >
                  <span className="buttonIcon">+</span>
                </button>
                <button
                  onClick={() => toggleActiveInput(id)}
                  className="button edit"
                >
                  <span className="buttonIcon">/</span>
                </button>
                <button
                  onClick={() => deleteCategory({ id })}
                  className="button delete"
                >
                  <span className="buttonIcon">X</span>
                </button>
              </div>
            )}
          </div>
          {(showNested[id] || subCategories.length > 0) && (
            <ul className="subcategories list">
              {subCategories.length > 0 && (
                <RecursiveCategories data={subCategories} />
              )}

              {showNested[id] && (
                <li className="card" style={{ border: '1px solid red' }}>
                  <Input onClose={() => toggleNested(id)} parentId={id} />
                </li>
              )}
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export default RecursiveCategories;
