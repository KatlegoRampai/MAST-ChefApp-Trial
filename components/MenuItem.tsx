import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MenuItem as MenuItemType } from '../util/types';
import { styles } from '../util/styles';

interface MenuItemProps {
  item: MenuItemType;
  onDelete?: (id: string) => void;
  onSelect?: (id: string) => void;
  displayMode?: 'full' | 'compact' | 'edit';
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  item, 
  onDelete, 
  onSelect, 
  displayMode = 'full' 
}) => {
  if (displayMode === 'compact') {
    return (
      <View style={styles.menuItemHome}>
        {onSelect && (
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => onSelect(item.id)}
          >
            {item.selected && <MaterialIcons name="check" size={24} color="#C79D5D" />}
          </TouchableOpacity>
        )}
        <Text style={styles.menuItemTitle}>{item.title}</Text>
        <Text style={styles.menuItemCourse}>{item.course}</Text>
        <Text style={styles.menuItemPrice}>R{item.price}</Text>
      </View>
    );
  }

  if (displayMode === 'edit') {
    return (
      <View style={styles.menuItemEdit}>
        <View style={styles.menuItemContent}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
          <View style={styles.menuItemDetails}>
            <Text style={styles.menuItemCourse}>{item.course}</Text>
            <Text style={styles.menuItemPrice}>R{item.price}</Text>
          </View>
        </View>
        {onDelete && (
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={() => onDelete(item.id)}
          >
            <MaterialIcons name="delete" size={24} color="#FF4444" />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View style={styles.menuItem}>
      <Text style={styles.sectionTitle}>{item.title}</Text>
      <Text style={styles.menuItemTitle}>{item.course}</Text>
      <Text style={styles.menuItemPrice}>R{item.price}</Text>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
    </View>
  );
};