import { createContext, useReducer, ReactNode } from 'react';
import {
  addCategoryRecursive,
  deleteCategoryRecursive,
  updateCategoryRecursive,
} from '../utils/updateCategories';

export interface ICategory {
  id: number;
  label: string;
  subCategories: ICategory[];
}

export interface IAddCategory {
  newCategory: ICategory;
  parentId?: number;
}
export interface IUpdateCategory {
  id: number;
  label: string;
  parentId?: string;
}

interface IDelCategory {
  id: number;
}

interface IAddProps {
  type: 'ADD';
  payload: IAddCategory;
}
interface IUpdateProps {
  type: 'UPDATE';
  payload: IUpdateCategory;
}
interface IDeleteProps {
  type: 'DELETE';
  payload: IDelCategory;
}

type ICategoryAction = IAddProps | IUpdateProps | IDeleteProps;
const initialState: ICategory[] = [];

if (localStorage.getItem('categories')) {
  const data = localStorage.getItem('categories');
  if (data) {
    const categories: ICategory[] = JSON.parse(data);
    initialState.push(...categories);
  }
}
interface ICategoryContext {
  categories: ICategory[];
  addCategory: (data: IAddCategory) => void;
  updateCategory: (data: IUpdateCategory) => void;
  deleteCategory: (data: IDelCategory) => void;
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: initialState,
  addCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
});

function categoryReducer(
  state: ICategory[],
  action: ICategoryAction
): ICategory[] {
  switch (action.type) {
    case 'ADD': {
      const { newCategory, parentId } = action.payload;
      const updatedCategories = addCategoryRecursive(
        newCategory,
        state,
        parentId
      );
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      return updatedCategories;
    }
    case 'UPDATE': {
      const { label, id } = action.payload;
      const updatedCategories = updateCategoryRecursive(label, id, state);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      return updatedCategories;
    }
    case 'DELETE': {
      const { id: categoryId } = action.payload;
      const updatedCategories = deleteCategoryRecursive(categoryId, state);
      localStorage.setItem('categories', JSON.stringify(updatedCategories));
      return updatedCategories;
    }
    default:
      return state;
  }
}

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const addCategory = (newCategoryData: IAddCategory) => {
    dispatch({
      type: 'ADD',
      payload: newCategoryData,
    });
  };
  const updateCategory = (updatedCategoryData: IUpdateCategory) => {
    dispatch({
      type: 'UPDATE',
      payload: updatedCategoryData,
    });
  };
  const deleteCategory = (delCategoryData: IDelCategory) => {
    dispatch({
      type: 'DELETE',
      payload: delCategoryData,
    });
  };

  return (
    <CategoryContext.Provider
      value={{
        categories: state,
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
