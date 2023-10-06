import React, { useContext, useState } from 'react';
import { CategoryContext, ICategory } from '../context/CategoryContext';
import AddIcon from '../assets/add.svg?react';
import EditIcon from '../assets/edit.svg?react';
import DeleteIcon from '../assets/delete.svg?react';
import Input from './Input';
import Button from './Button';

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
        <li key={id} className="card">
          <div className="inner">
            <Input
              disabled={!activeInput[id]}
              initValue={label}
              categoryId={id}
              parentId={parentId}
              onClose={() => toggleActiveInput(id)}
            />
            {!activeInput[id] && (
              <ul className="actions">
                <li>
                  <Button
                    onClick={() => toggleNested(id)}
                    className="add"
                    ariaLabel="Add the category"
                    disabled={activeInput[id]}
                  >
                    <AddIcon className="buttonIcon" />
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => toggleActiveInput(id)}
                    className="edit"
                    ariaLabel="Edit the category"
                  >
                    <EditIcon className="buttonIcon" />
                  </Button>
                </li>
                <li>
                  <Button
                    onClick={() => deleteCategory({ id })}
                    className="delete"
                    ariaLabel="Delete the category"
                  >
                    <DeleteIcon className="buttonIcon" />
                  </Button>
                </li>
              </ul>
            )}
          </div>
          {(showNested[id] || subCategories.length > 0) && (
            <ul className="subcategories">
              {subCategories.length > 0 && (
                <RecursiveCategories data={subCategories} />
              )}

              {showNested[id] && (
                <li className="card">
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
