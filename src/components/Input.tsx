import { useContext, useState } from 'react';
import { CategoryContext } from '../context/CategoryContext';
import CheckIcon from '../assets/check.svg?react';
import DeleteIcon from '../assets/delete.svg?react';
import Button from './Button';

interface InputProps {
  onClose: () => void;
  disabled?: boolean;
  initValue?: string;
  categoryId?: number;
  parentId?: number;
}

const Input: React.FC<InputProps> = ({
  onClose,
  disabled,
  initValue,
  categoryId,
  parentId,
}) => {
  const [value, setValue] = useState(initValue || '');
  const { addCategory, updateCategory } = useContext(CategoryContext);

  const handleSave = () => {
    if (!categoryId) {
      const newCategory = { id: Date.now(), label: value, subCategories: [] };
      addCategory({ newCategory, parentId });
    } else {
      const newCategory = { id: categoryId, label: value };
      updateCategory(newCategory);
    }
    onClose();
  };

  return (
    <div className="inner">
      <input
        className="input"
        placeholder="Category name"
        value={value}
        autoFocus={true}
        onAbort={onClose}
        onBlur={onClose}
        name="category name"
        disabled={disabled}
        onChange={(e) => setValue(e.target.value.trim())}
      />
      {!disabled && (
        <ul className="inputActions">
          <li>
            <Button
              onClick={onClose}
              className="remove"
              ariaLabel="Abort the input"
            >
              <DeleteIcon className="buttonIcon" />
            </Button>
          </li>
          <li>
            <Button
              action={handleSave}
              className="save"
              ariaLabel="Save the category"
            >
              <CheckIcon className="buttonIcon" />
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Input;
