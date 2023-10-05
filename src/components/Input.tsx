import { useState } from 'react';
interface InputProps {
  onClose: () => void;
  addCategory: (v: string) => void;
}
const Input: React.FC<InputProps> = ({ onClose, addCategory }) => {
  const [value, setValue] = useState('');
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
        onChange={(e) => setValue(e.target.value.trim())}
      />
      <div className="inputActions">
        <button onClick={handleSave} className="button save">
          <span className="buttonIcon">V</span>
        </button>
        <button onClick={onClose} className="button remove">
          <span className="buttonIcon">X</span>
        </button>
      </div>
    </div>
  );
};

export default Input;
