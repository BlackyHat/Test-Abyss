// import React, { useState } from 'react';
// import { ICategory } from './App';
// import Input from './Input';

// interface ICategoriesProps {
//   category: ICategory;
//   className?: string;
//   onClose?: () => void; //TODO:
//   addSubCategory: (v: string) => void;
// }
// const Categories: React.FC<ICategoriesProps> = ({
//   onClose,
//   addSubCategory,
//   category: { label, subCategories },
//   className,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [categories, setCategories] = useState<ICategory[]>([

//   const renderSubcategories = (subCategories: ICategory[]) => {
//     if (subCategories.length === 0) {
//       return null;
//     }
//     return (
//       <ul className="subcategories list">
//         {subCategories.map((subcategory, idx) => (
//           <li key={idx}>
//             <Categories
//               category={subcategory}
//               onClose={onClose}
//               addSubCategory={addSubCategory}
//               className="subcategory"
//             />
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {isOpen && <Input onClose={handleClose} addCategory={addCategory} />}
//       //TODO:
//       <div className="card" style={{ border: '1px solid red' }}>
//         <div className="category_wrapper">
//           <p className={`label category ${className}`}>{label}</p>
//           <div className="actions">
//             <button onClick={() => {}} className="button add">
//               <span className="buttonIcon">+</span>
//             </button>
//             <button onClick={() => {}} className="button edit">
//               <span className="buttonIcon">/</span>
//             </button>
//             <button onClick={() => {}} className="button delete">
//               <span className="buttonIcon">X</span>
//             </button>
//           </div>
//         </div>
//         {renderSubcategories(subCategories)}
//       </div>
//     </>
//   );
// };

// export default Categories;
