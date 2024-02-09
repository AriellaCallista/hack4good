import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { doc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../config';
import { volunteerGender, genderColors, volunteerSkills, skillsColors, 
  volunteerInterests, interestsColors, volunteerWorkStatus, workStatusColors } from '../screens/volunteer/dataOptions';
import { ScrollView } from 'react-native-gesture-handler';

export default function VolunteerStats({ eventId }) {
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
    <ScrollView>
      <Text>Gender Statistics</Text>
      {genderCount.length > 0 && genderCount.some(value => value !== 0) ? (
        <PieChart
          widthAndHeight='250'
          series={genderCount}
          sliceColor={genderColors}
          coverRadius={0.45}
          coverFill={'#FFF'}
        />
      ) : (
        <Text>No data available</Text>
      )}
      <Legend name={volunteerGender} count={genderCount} colors={genderColors}/>

      <Text>Skills Statistics</Text>
      {skillsCount.length > 0 && skillsCount.some(value => value !== 0) ? (
        <PieChart
          widthAndHeight='250'
          series={skillsCount}
          sliceColor={skillsColors}
          coverRadius={0.45}
          coverFill={'#FFF'}
        />
      ) : (
        <Text>No data available</Text>
      )}
      <Legend name={volunteerSkills} count={skillsCount} colors={skillsColors}/>
      
      <Text>Interests Statistics</Text>
      {interestsCount.length > 0 && interestsCount.some(value => value !== 0) ? (
        <PieChart
          widthAndHeight='250'
          series={interestsCount}
          sliceColor={interestsColors}
          coverRadius={0.45}
          coverFill={'#FFF'}
        />
      ) : (
        <Text>No data available</Text>
      )}
      <Legend name={volunteerInterests} count={interestsCount} colors={interestsColors}/>

      <Text>Work Status Statistics</Text>
      {workStatusCount.length > 0 && workStatusCount.some(value => value !== 0) ? (
        <PieChart
          widthAndHeight='250'
          series={workStatusCount}
          sliceColor={workStatusColors}
          coverRadius={0.45}
          coverFill={'#FFF'}
        />
      ) : (
        <Text>No data available</Text>
      )}
      <Legend name={volunteerWorkStatus} count={workStatusCount} colors={workStatusColors}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendColor: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});