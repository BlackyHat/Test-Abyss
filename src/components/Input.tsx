import { useState } from 'react';
interface InputProps {
  onClose: () => void;
  addCategory: (v: string) => void;
  disabled?: boolean;
  initValue?: string;
}
const Input: React.FC<InputProps> = ({
  onClose,
  addCategory,
  disabled,
  initValue,
}) => {
  const [value, setValue] = useState(initValue || '');
  const handleSave = () => {
    addCategory(value);
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
