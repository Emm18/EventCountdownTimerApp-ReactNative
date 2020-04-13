import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { withNavigationFocus } from 'react-navigation';
import { Feather, AntDesign } from '@expo/vector-icons';

import useCountdownTimer from '../hooks/useCountdownTimer';
import { Context as CountdownContext } from '../context/CountdownContext';
import Spacer from '../components/Spacer';

const CountdownDetailScreen = ({ navigation, isFocused }) => {
    const [countdown, setCountdown] = useState(null);
    const { id, title, date } = navigation.getParam('item');
    const { deleteCountdown } = useContext(CountdownContext);
    const callback = (newTime) => {
        setCountdown(newTime)
    }

    let time = useCountdownTimer(isFocused, date, callback);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.info}>
                    {countdown ? <Text h3> {countdown} </Text> : time ? <Text h3>{time}</Text> : <Text h3> loading... </Text>}
                    <Text> {title}</Text>
                    <Text> {date}</Text>
                </View>


                <View style={styles.buttons}>
                    <Button
                        icon={<Feather name="edit" size={30} style={{ marginRight: 5 }} />}
                        type="outline"
                        title="Edit"
                        onPress={() => { navigation.navigate('UpdateCountdown', { item: { id, title, date } }) }}
                    />
                    <Spacer />
                    <Button
                        icon={<AntDesign name="delete" size={30} style={{ marginRight: 5 }} />}
                        buttonStyle={{ backgroundColor: 'red' }}
                        type="solid"
                        title="Delete"
                        onPress={() => { deleteCountdown(id, () => navigation.navigate('CountdownList')) }}
                    />
                </View>

            </View>
        </>
    )
};

CountdownDetailScreen.navigationOptions = {
    title: 'Event Details'
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        margin: 10,
        flex: 1,
        justifyContent: "space-between",
    },
    info: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttons: {
        margin: 10
    },
    titleText: {
        fontSize: 20
    }
});

export default withNavigationFocus(CountdownDetailScreen);