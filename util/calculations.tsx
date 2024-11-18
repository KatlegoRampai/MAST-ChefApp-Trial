import { Alert } from 'react-native';
import { MenuItem } from './types';

export const calculateAveragePrice = (menuItems: MenuItem[]): string => {
  if (menuItems.length === 0) return 'N/A';
  return `R${(menuItems.reduce((sum, item) => sum + parseInt(item.price), 0) / menuItems.length).toFixed(2)}`;
};

export const handleSaveMenuItem = (
  newMenuItem: MenuItem,
  menuItems: MenuItem[],
  setMenuItems: (items: MenuItem[]) => void,
  resetNewMenuItem: () => void
) => {
  if (newMenuItem.title && newMenuItem.description && newMenuItem.price && newMenuItem.course) {
    setMenuItems([...menuItems, { ...newMenuItem, id: Date.now().toString() }]);
    resetNewMenuItem();
    Alert.alert('Success', 'Menu item added successfully!');
  } else {
    Alert.alert('Error', 'Please fill all fields');
  }
};

export const handleDeleteMenuItem = (
  id: string,
  menuItems: MenuItem[],
  setMenuItems: (items: MenuItem[]) => void
) => {
  Alert.alert(
    "Delete Menu Item",
    "Are you sure you want to delete this menu item?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setMenuItems(menuItems.filter(item => item.id !== id));
          Alert.alert('Success', 'Menu item deleted successfully!');
        }
      }
    ]
  );
};
