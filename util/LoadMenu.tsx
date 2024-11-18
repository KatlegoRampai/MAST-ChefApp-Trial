import { MenuItem } from './types';
import { CourseType } from './courseList';

export const getFilteredMenuItems = (menuItems: MenuItem[], selectedCourseFilter: string) => {
  if (selectedCourseFilter === 'All') {
    return menuItems;
  }
  return menuItems.filter(item => item.course === selectedCourseFilter);
};

export const getFilteredMenuByCourse = (menuItems: MenuItem[], selectedCourseCount: CourseType) => {
  switch (selectedCourseCount) {
    case '3':
      return menuItems.filter((item) => 
        ['Appetizer', 'Main Course', 'Dessert'].includes(item.course));
    case '5':
      return menuItems.filter((item) => 
        ['Hors D-Oeuvres', 'Appetizer', 'Salads', 'Main Course', 'Dessert'].includes(item.course));
    case '7':
      return menuItems.filter((item) => 
        ['Hors D-Oeuvres', 'Soup', 'Appetizer', 'Salads', 'Main Course', 'Dessert', 'Mignardise'].includes(item.course));
    case '12':
      return menuItems.filter((item) => [
        'Hors D-Oeuvres', 'Amuse-Bouche', 'Soup', 'Appetizer', 'Salads', 'Fish',
        'First Main Course', 'Palate Cleanser', 'Second Main Course', 'Cheese Course',
        'Dessert', 'Mignardise'
      ].includes(item.course));
    default:
      return [];
  }
};