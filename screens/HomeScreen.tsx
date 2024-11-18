import { View } from 'react-native';
import { getFilteredMenuItems } from '../util/LoadMenu';
import { calculateAveragePrice } from '../util/calculations';
import { courses } from '../util/courseList';
import { styles } from '../util/styles';
import { MenuItem } from '../util/types';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import { Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

interface HomeScreenProps {
  user: string;
  menuItems: MenuItem[];
  preparedMenus: { [key: string]: MenuItem[] };
  onLogout: () => void;
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  menuItems,
  preparedMenus,
  onLogout,
  navigation
}) => {
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'full' | 'prepared'>('full');

  const currentMenuItems = user === 'Chef' ? menuItems : 
    (viewMode === 'full' ? menuItems : (preparedMenus[user] || []));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/Logo.png')} 
          style={styles.headerLogo} 
        />
        <Text style={styles.welcomeText}>Welcome {user}</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBlock}>
          <Text style={styles.statTitle}>Total Menu Items</Text>
          <Text style={styles.statValue}>
            {user === 'Chef' ? menuItems.length : 
              (preparedMenus[user]?.length || 0)}
          </Text>
        </View>
        <View style={styles.statBlock}>
          <Text style={styles.statTitle}>Avg Price per Course</Text>
          <Text style={styles.statValue}>
            {calculateAveragePrice(currentMenuItems)}
          </Text>
        </View>
      </View>
      <Picker
        selectedValue={selectedCourseFilter}
        style={styles.picker}
        onValueChange={setSelectedCourseFilter}
      >
        <Picker.Item label="All Courses" value="All" />
        {courses.map((course) => (
          <Picker.Item key={course} label={course} value={course} />
        ))}
      </Picker>
      <ScrollView style={styles.menuList}>
        {getFilteredMenuItems(currentMenuItems, selectedCourseFilter).map((item) => (
          <MenuItemCompnent key={item.id} item={item} />
          //<MenuItemComponent key={item.id} item={item} />
        ))}
      </ScrollView>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        {user === 'Chef' && (
          <>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Enter')}>
              <Text style={styles.navButtonText}>Enter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('View')}>
              <Text style={styles.navButtonText}>View</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity style={styles.navButton} onPress={onLogout}>
          <Text style={styles.navButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};