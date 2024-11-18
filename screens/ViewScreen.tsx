import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MenuItem as MenuItemComponent } from '../components/MenuItem';
import { getFilteredMenuByCourse } from '../util/LoadMenu';
import { clients, CourseType } from '../util/courseList';
import { styles } from '../util/styles';
import { MenuItem } from '../util/types';

interface PreparedMenuItem {
  items: MenuItem[];
  bookingDate: string;
}

interface ViewScreenProps {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  preparedMenus: { [key: string]: PreparedMenuItem };
  setPreparedMenus: (menus: { [key: string]: PreparedMenuItem }) => void;
  navigation: any;
  onLogout: () => void;  // Added onLogout prop
}

export const ViewScreen: React.FC<ViewScreenProps> = ({
  menuItems,
  setMenuItems,
  preparedMenus,
  setPreparedMenus,
  navigation,
  onLogout  // Added to props destructuring
}) => {
  const [currentUser, setCurrentUser] = useState<string>('');
  const [selectedCourseCount, setSelectedCourseCount] = useState<CourseType>('3');
  const [bookingDate, setBookingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [showFullMenu, setShowFullMenu] = useState(false);

  // Get unique course names from menu items
  const courseNames = Array.from(new Set(menuItems.map(item => item.course)));

  const handleSavePreparedMenu = () => {
    if (!currentUser) {
      Alert.alert('Error', 'Please select a client first');
      return;
    }

    const preparedMenu = menuItems.filter(item => item.selected);
    setPreparedMenus({
      ...preparedMenus,
      [currentUser]: {
        items: preparedMenu,
        bookingDate: bookingDate.toISOString(),
      }
    });
    Alert.alert('Success', `Menu prepared for ${currentUser} on ${bookingDate.toLocaleDateString()}`);
  };

  const handleToggleMenuItem = (id: string) => {
    const updatedMenuItems = menuItems.map(menuItem =>
      menuItem.id === id ? { ...menuItem, selected: !menuItem.selected } : menuItem
    );
    setMenuItems(updatedMenuItems);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBookingDate(selectedDate);
    }
  };

  const getFilteredMenu = () => {
    let filteredItems = menuItems;
    
    if (courseFilter !== 'all') {
      filteredItems = filteredItems.filter(item => item.course === courseFilter);
    }
    
    if (!showFullMenu) {
      filteredItems = getFilteredMenuByCourse(filteredItems, selectedCourseCount);
    }
    
    return filteredItems;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.headerLogo} />
        <Text style={styles.welcomeText}>Prepare Menu</Text>
      </View>

      {/* Client Selection */}
      <Picker
        selectedValue={currentUser}
        style={styles.picker}
        onValueChange={setCurrentUser}
      >
        <Picker.Item label="Select Client" value="" />
        {clients.filter(client => client !== 'Chef').map((client) => (
          <Picker.Item key={client} label={client} value={client} />
        ))}
      </Picker>

      {/* Booking Date Selection */}
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateButtonText}>
          Booking Date: {bookingDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={bookingDate}
          mode="date"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* Course Count Selection */}
      <Picker
        selectedValue={selectedCourseCount}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedCourseCount(itemValue as CourseType)}
      >
        <Picker.Item label="3-Course Menu" value="3" />
        <Picker.Item label="5-Course Menu" value="5" />
        <Picker.Item label="7-Course Menu" value="7" />
        <Picker.Item label="12-Course Menu" value="12" />
      </Picker>

      {/* Menu Display Controls */}
      <View style={styles.menuControls}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowFullMenu(!showFullMenu)}
        >
          <Text style={styles.buttonText}>
            {showFullMenu ? 'Show Filtered Menu' : 'Show Full Menu'}
          </Text>
        </TouchableOpacity>

        <Picker
          selectedValue={courseFilter}
          style={styles.coursePicker}
          onValueChange={setCourseFilter}
        >
          <Picker.Item label="All Courses" value="all" />
          {courseNames.map((course) => (
            <Picker.Item key={course} label={course} value={course} />
          ))}
        </Picker>
      </View>

      {/* Menu Items List */}
      <FlatList
        data={getFilteredMenu()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItemComponent
            item={item}
            displayMode="compact"
            onSelect={handleToggleMenuItem}
          />
        )}
      />

      {/* Save Button */}
      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={handleSavePreparedMenu}
      >
        <Text style={styles.buttonText}>Save Prepared Menu</Text>
      </TouchableOpacity>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={() => navigation.navigate('Enter')}
        >
          <Text style={styles.navButtonText}>Enter</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={onLogout}
        >
          <Text style={styles.navButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};