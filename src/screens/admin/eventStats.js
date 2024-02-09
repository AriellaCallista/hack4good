import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import VolunteerStats from '../../components/voluStats';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config';

export default function EventStats({ route }) {
  const { eventId } = route.params

  return (
    <View>
      <Text>Event Stats</Text>
      <Text>{eventId}</Text>
      <VolunteerStats eventId={eventId}/>  
      </View>
  );
}
