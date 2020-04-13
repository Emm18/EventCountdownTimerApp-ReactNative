import React, { useContext } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text, ListItem } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { Context as CountdownContext } from '../context/CountdownContext';

const CountdownListScreen = ({ navigation }) => {
    const { state, fetchCountdownList } = useContext(CountdownContext);

    return (
        <>
            <NavigationEvents
                onWillFocus={fetchCountdownList}
            />
            {state ? <FlatList
                data={state}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => {
                    return <TouchableOpacity onPress={() => navigation.navigate('CountdownDetail', { item })}>
                        <ListItem
                            chevron
                            bottomDivider
                            title={<Text style={styles.titleText}>{item.title.toUpperCase()}</Text>}
                            subtitle={item.date} />
                    </TouchableOpacity>
                }}
            /> : null }

            <View style={styles.buttons}>
                <Button
                    icon={<Feather name="plus" size={30} />}
                    type="outline"
                    title="Create Event"
                    onPress={() => { navigation.navigate('CreateCountdown') }}
                />
            </View>
        </>
    )
};

CountdownListScreen.navigationOptions = (props) => {
    return {
        headerRight: () => <TouchableOpacity onPress={() => props.navigation.navigate('Calendar')}>
            <FontAwesome name="calendar" size={30} style={{ marginRight: 10 }} />
        </TouchableOpacity>
    };
};

const styles = StyleSheet.create({
    buttons: {
        margin: 20
    },
    titleText: {
        fontSize: 20
    }
});

export default CountdownListScreen;