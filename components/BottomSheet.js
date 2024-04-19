import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import MapViewDirections from 'react-native-maps-directions'; // Import the MapViewDirections component

const BottomSheet = ({ menuItems, faculties, userLocation, mapRef }) => {
  const [visibleSheetIndex, setVisibleSheetIndex] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const openSheet = (index) => {
    setVisibleSheetIndex(index);
  };

  const closeSheet = () => {
    setVisibleSheetIndex(null);
  };

  const handleFacultySelection = (faculty) => {
    setSelectedFaculty(faculty);
    closeSheet();
  };

  

  const handleCRCBuildingClick = () => {
   /* setSelectedFaculty({
      id: 2, // ID of the CRC Building faculty
      name: 'CRC Building', // Name of the CRC Building faculty
      latitude: 6.883212922850658,
      longitude: 79.88657439333122,
    }); */
    closeSheet();

    if (userLocation && mapRef.current) {
      const CRCBuildingLocation = {
        latitude: 6.883212922850658,
        longitude: 79.88657439333122,
      }; 

      mapRef.current.fitToCoordinates(
        [
          { latitude: userLocation.latitude, longitude: userLocation.longitude },
          { latitude: CRCBuildingLocation.latitude, longitude: CRCBuildingLocation.longitude },
        ],
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    } else {
      console.log('User location not available or map reference not set');
    }
  };

  return (
    <View style={[styles.container, { top: 350 }]}>
      {menuItems.map((menuItem, index) => (
        <TouchableOpacity key={index} style={styles.button} onPress={() => {
          if (menuItem.title === "CRC Building") {
            handleCRCBuildingClick();
          } else {
            openSheet(index);
          }
        }}>
          <Text style={styles.buttonText}>{menuItem.title}</Text>
        </TouchableOpacity>
      ))}
      
      {menuItems.map((menuItem, index) => (
        <Modal key={index} visible={visibleSheetIndex === index} transparent animationType="slide">
          <View style={styles.bottomSheetContainer}>
            {menuItem.component}
            <ScrollView>
              {faculties.map((faculty, idx) => (
                <TouchableOpacity key={idx} onPress={() => handleFacultySelection(faculty)}>
                  <Text>{faculty.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={closeSheet}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      ))}
      {/* Display MapViewDirections if a faculty is selected */}
      {userLocation && (
        
        <MapViewDirections
          origin={userLocation} // Your current location
          destination={{ latitude: 6.884437103365703, longitude: 79.88349172147429 }} // Selected faculty location
          apikey="AIzaSyDFKMhw75pTyqq8keyZ3MGvbt-1OHMpY3M"
          strokeWidth={4}
          strokeColor="hotpink"
        />
      )
      }
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#ff8566',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
