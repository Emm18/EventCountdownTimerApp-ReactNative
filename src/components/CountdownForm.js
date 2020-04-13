import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { Input, Button, Text, Overlay } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment'
import Spacer from './Spacer'

const CountdownForm = (props) => {
    const [title, setTitle] = useState(props.initialValues.title);
    const [selectedDate, setDate] = useState(props.initialValues.selectedDate);
    const [showValidationMessage, setValidationMessage] = useState(false);

    const onChangeDate = (newDate) => {
        setDate(newDate)
    }
    return (
        <>
            <Overlay
                isVisible={showValidationMessage}
                height={85}
            >
                <View>
                    <Text style={{ fontSize: 20 }}>Title is required</Text>
                    <Button
                        type="outline"
                        title="Confirm"
                        onPress={() => { setValidationMessage(false) }}
                    />
                </View>
            </Overlay>
            <Spacer /><Spacer /><Spacer />
            <Spacer>
                <View>
                    <Input
                        value={title}
                        placeholder="Enter Title Name"
                        onChangeText={setTitle}
                    />
                </View>
            </Spacer>

            <Spacer />
            <CalendarPicker
                previousTitle={'<'}
                nextTitle={'>'}
                onDateChange={(date) => onChangeDate(moment(date).format('LL'))}
                todayBackgroundColor={'rgba(255, 255, 255, .4)'}
                initialDate={moment(new Date(selectedDate))}
                selectedStartDate={moment(new Date(selectedDate))}
                selectedEndDate={moment(new Date(selectedDate))}
                minDate={moment()}
            />
            {selectedDate ?
                <View style={{ alignItems: 'center' }}>
                    <Text>Selected Date</Text>
                    <Text h3>{selectedDate}</Text>
                </View>
                : <View style={{ alignItems: 'center' }}>
                    <Spacer /><Spacer />
                    <Text h3>SELECT A DATE</Text>
                </View>}
            <Spacer />
            <View style={styles.buttons}>
                <Button
                    icon={<FontAwesome name="save" size={30} style={{ marginRight: 5 }} />}
                    type="outline"
                    title="Save"
                    onPress={() => {
                        if (title) {
                            props.onSubmit(title, selectedDate);
                        } else {
                            setValidationMessage(true);
                        }
                    }}
                />
            </View>
        </>
    );
};

CountdownForm.defaultProps = {
    initialValues: {
        title: '',
        selectedDate: moment(new Date()).format('LL')
    }
}

const styles = StyleSheet.create({
    buttons: {
        margin: 20
    }
});

export default CountdownForm;