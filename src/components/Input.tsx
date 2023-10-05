import { useContext, useState } from 'react';
import { CategoryContext } from '../../context/CategoryContext';

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
    <div className="category_wrapper">
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
        <div className="inputActions">
          <button onMouseDown={handleSave} className="button save">
            <span className="buttonIcon">V</span>
          </button>
          <button onMouseDown={onClose} className="button remove">
            <span className="buttonIcon">X</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;
