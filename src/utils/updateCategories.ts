import { ICategory } from '../../context/CategoryContext';

export const addCategoryRecursive = (
  newCategory: ICategory,
  categories: ICategory[],
  parentId?: number
): ICategory[] => {
  if (!parentId) {
    return [...categories, newCategory];
  }
  return categories.map((category) => {
    if (category.id === parentId) {
      return {
        ...category,
        subCategories: [...category.subCategories, newCategory],
      };
    } else if (category.subCategories.length > 0) {
      return {
        ...category,
        subCategories: addCategoryRecursive(
          newCategory,
          category.subCategories,
          parentId
        ),
      };
    }
    return category;
  });
};
export const updateCategoryRecursive = (
  label: string,
  id: number,
  categories: ICategory[]
): ICategory[] => {
  return categories.map((category) => {
    if (category.id === id) {
      return {
        ...category,
        label,
      };
    } else if (category.subCategories.length > 0) {
      return {
        ...category,
        subCategories: updateCategoryRecursive(
          label,
          id,
          category.subCategories
        ),
      };
    }
    return category;
  });
};

export const deleteCategoryRecursive = (
  categoryId: number,
  categories: ICategory[]
): ICategory[] => {
  return categories.filter((category) => {
    if (category.id === categoryId) {
      return false;
    }
    if (category.subCategories.length > 0) {
      category.subCategories = deleteCategoryRecursive(
        categoryId,
        category.subCategories
      );
    }

    return true;
  });
};
