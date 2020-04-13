import React, { useContext } from 'react';

import CountdownForm from '../components/CountdownForm';
import { Context as CountdownContext } from '../context/CountdownContext'

const CreateCountdownScreen = ({ navigation }) => {
    const { createCountdown } = useContext(CountdownContext);

    return (
        <>
            <CountdownForm
                onSubmit={(title, selectedDate) => {
                    createCountdown(title, selectedDate, () => navigation.navigate('CountdownList'))
                }}
            />
        </>
    )
};

CreateCountdownScreen.navigationOptions = {
    title: 'Create Event'
};

export default CreateCountdownScreen;