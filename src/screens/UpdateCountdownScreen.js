import React, { useContext } from 'react';

import CountdownForm from '../components/CountdownForm'
import { Context as CountdownContext } from '../context/CountdownContext'

const UpdateCountdownScreen = ({ navigation }) => {
    const { id, title, date } = navigation.getParam('item');
    const { updateCountdown } = useContext(CountdownContext);
    return (
        <>
            <CountdownForm
                initialValues={{
                    title: title,
                    selectedDate: date
                }}
                onSubmit={(title, selectedDate) => {
                    updateCountdown(id, title, selectedDate, () => navigation.navigate('CountdownList'))
                }}
            />
        </>
    )
};

UpdateCountdownScreen.navigationOptions = {
    title: 'Edit Details'
};

export default UpdateCountdownScreen;