import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import PieChart from 'react-native-pie-chart';
import { doc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config';
import { volunteerGender, genderColors, volunteerSkills, skillsColors, 
  volunteerInterests, interestsColors, volunteerWorkStatus, workStatusColors } from '../volunteer/dataOptions';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../utils/colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function EventStats({ route, navigation }) {
  const { eventId } = route.params
  const [genderCount, setGenderCount] = useState([]);
  const [skillsCount, setSkillsCount] = useState([]);
  const [interestsCount, setInterestsCount] = useState([]);
  const [workStatusCount, setWorkStatusCount] = useState([]);

  useEffect(() => {
    const fetchVolunteerData = () => {
      const eventRef = doc(db, 'events', eventId);
      const volunteersCollection = collection(eventRef, 'volunteers');

      getDocs(volunteersCollection)
        .then((volunteersSnapshot) => {
          let genderData = [];
          let skillsData = [];
          let interestsData = [];
          let workStatusData = [];

          volunteersSnapshot.forEach((volunteerDoc) => {
            const volunteerGender = volunteerDoc.get('gender');
            genderData = [...genderData, volunteerGender]

            const volunteerSkills = volunteerDoc.get('skills');
            skillsData = [...skillsData, ...volunteerSkills];

            const volunteerInterests = volunteerDoc.get('interests');
            interestsData = [...interestsData, ...volunteerInterests];

            const volunteerWorkStatus = volunteerDoc.get('workStatus');
            workStatusData = [...workStatusData, volunteerWorkStatus];
          });

          // Generate gender stats
          const genderStats = generateStats(genderData, volunteerGender)
          setGenderCount(Object.values(genderStats))

          // Generate skills stats
          const skillsStats = generateStats(skillsData, volunteerSkills)
          setSkillsCount(Object.values(skillsStats))
          
          // Generate interests stats
          const interestsStats = generateStats(interestsData, volunteerInterests)
          setInterestsCount(Object.values(interestsStats))

          // Generate skills stats
          const workStatusStats = generateStats(workStatusData, volunteerWorkStatus)
          setWorkStatusCount(Object.values(workStatusStats))
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };

    fetchVolunteerData();
  }, [eventId]);

  const generateStats = (data, categories) => {
    const stats = {};

    categories.forEach((category) => {
      stats[category] = 0;
    });

    data.forEach((item) => {
      const index = categories.indexOf(item);
      if (index !== -1) {
        stats[item] += 1;
      }
    });

    return stats;
  };

  const Legend = ({ name, count, colors }) => (
    <View style={styles.legendContainer}>
      {count.map((value, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: colors[index] }]} />
          <Text>{`${name[index]}: ${value}`}</Text>
        </View>
      ))}
    </View>
  );


  return (
    <ScrollView style={styles.container}>
      <View style={{marginTop: 50, marginLeft: 15, marginBottom: -30}}>
        <TouchableOpacity onPress={() => navigation.navigate('AdminChat', {name: eventId, uid: eventId, navigation: navigation})}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
     
      <Text style={styles.caption}>Event Statistics</Text>
      <Text style={styles.eventTitle}>{eventId}</Text>

      <View>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.pieChartContainer}>
            {genderCount.length > 0 && genderCount.some(value => value !== 0) ? (
                <PieChart
                widthAndHeight='250'
                series={genderCount}
                sliceColor={genderColors}
                />
            ) : (
                <Text>No data available</Text>
            )}
        </View>
        <Legend name={volunteerGender} count={genderCount} colors={genderColors}/>
      </View>

      <View>
        <Text style={styles.label}>Skills</Text>
        <View style={styles.pieChartContainer}>
            {skillsCount.length > 0 && skillsCount.some(value => value !== 0) ? (
                <PieChart
                widthAndHeight='250'
                series={skillsCount}
                sliceColor={skillsColors}
                />
            ) : (
                <Text>No data available</Text>
            )}
        </View>
        <Legend name={volunteerSkills} count={skillsCount} colors={skillsColors}/>
      </View>

      <View>
        <Text style={styles.label}>Interests</Text>
        <View style={styles.pieChartContainer}>
            {interestsCount.length > 0 && interestsCount.some(value => value !== 0) ? (
                <PieChart
                widthAndHeight='250'
                series={interestsCount}
                sliceColor={interestsColors}
                />
            ) : (
                <Text>No data available</Text>
            )}
        </View>
        <Legend name={volunteerInterests} count={interestsCount} colors={interestsColors}/>
      </View>
      
      <View>
        <Text style={styles.label}>Work Status</Text>
        <View style={styles.pieChartContainer}>
            {workStatusCount.length > 0 && workStatusCount.some(value => value !== 0) ? (
                <PieChart
                widthAndHeight='250'
                series={workStatusCount}
                sliceColor={workStatusColors}
                />
            ) : (
                <Text>No data available</Text>
            )}
        </View>
        <Legend name={volunteerWorkStatus} count={workStatusCount} colors={workStatusColors}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightPink
  },
  caption: {
    fontFamily: "Lilita",
    color: 'white',
    fontSize: 22,
    marginLeft: 10,
    marginRight:10,
    marginTop: 40,
    textAlign: 'center',
    padding: 10,
    backgroundColor: colors.magentaRed,
    borderRadius: 10
  },
  eventTitle: {
    fontFamily: "Lilita",
    color: colors.magentaRed,
    fontSize: 50,
    padding: 10,
    textAlign: 'center'
  },
  legendContainer: {
    // flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    padding: 20,
    maxWidth: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  pieChartContainer: {
    marginTop: 25,
    marginBottom: -10,
    alignItems: 'center'
  },
  label: {
    fontFamily: "Lilita",
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    backgroundColor: colors.magentaRed,
    marginTop: 10,
    padding: 5
  },
});

