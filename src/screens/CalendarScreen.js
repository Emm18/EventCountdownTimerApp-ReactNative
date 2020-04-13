import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const CalendarScreen = () => {

    return (
        <>
            <View style={styles.container}>
                <CalendarPicker
                    previousTitle={'<'}
                    nextTitle={'>'}
                    onDateChange={(date) => { }}
                />
            </View>
        </>
    )
};

CalendarScreen.navigationOptions = {
    title: 'Calendar'
};

const styles = StyleSheet.create({});

export default CalendarScreen;