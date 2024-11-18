import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuItem as MenuItemComponent } from '../components/MenuItem';
import { handleSaveMenuItem, handleDeleteMenuItem } from '../util/calculations';
import { courses } from '../util/courseList';
import { styles } from '../util/styles';
import { MenuItem } from '../util/types';
import { ScrollView } from 'react-native-gesture-handler';

interface EnterScreenProps {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  navigation: any;
  onLogout: () => void; // Added onLogout prop
}

export const EnterScreen: React.FC<EnterScreenProps> = ({
  menuItems,
  setMenuItems,
  navigation,
  onLogout // Added to destructuring
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newMenuItem, setNewMenuItem] = useState<MenuItem>({
    id: '',
    title: '',
    description: '',
    price: '',
    course: 'Starters'
  });

  const resetNewMenuItem = () => {
    setNewMenuItem({
      id: '',
      title: '',
      description: '',
      price: '',
      course: 'Starters'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/Logo.png')} 
          style={styles.headerLogo} 
        />
        <Text style={styles.welcomeText}>Enter Menu Items</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search menu items..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={newMenuItem.title}
          onChangeText={(text) => setNewMenuItem({ ...newMenuItem, title: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newMenuItem.description}
          onChangeText={(text) => setNewMenuItem({ ...newMenuItem, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={newMenuItem.price}
          onChangeText={(text) => setNewMenuItem({ ...newMenuItem, price: text })}
          keyboardType="numeric"
        />
        <Picker
          selectedValue={newMenuItem.course}
          style={styles.picker}
          onValueChange={(itemValue) => setNewMenuItem({ ...newMenuItem, course: itemValue })}
        >
          {courses.map((course) => (
            <Picker.Item key={course} label={course} value={course} />
          ))}
        </Picker>

        <TouchableOpacity 
          style={styles.saveButton} 
          onPress={() => handleSaveMenuItem(newMenuItem, menuItems, setMenuItems, resetNewMenuItem)}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
        data={menuItems.filter(item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.course.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        style={styles.menuList}
        renderItem={({ item }) => (
          <MenuItemComponent
            item={item}
            displayMode="edit"
            onDelete={(id) => handleDeleteMenuItem(id, menuItems, setMenuItems)}
          />
        )}
      />

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('View')}>
          <Text style={styles.navButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={onLogout}>
          <Text style={styles.navButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};