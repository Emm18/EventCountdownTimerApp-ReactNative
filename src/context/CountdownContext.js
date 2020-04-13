import createDataContext from './createDataContext';
import { AsyncStorage } from 'react-native';

const countdownReducer = (state, action) => {

    if (action.type == 'fetch_countdown_list') {
        return action.payload
    }

    return state;
};

const fetchCountdownList = dispatch => async () => {
    const countdownList = await AsyncStorage.getItem('events');

    if (countdownList) {
        dispatch({ type: 'fetch_countdown_list', payload: JSON.parse(countdownList) })
    }
};

const createCountdown = dispatch => async (title, date, callback) => {
    let newEvent = [];
    const countdownList = await AsyncStorage.getItem('events');

    if (countdownList) {
        let id = await generateRandomId(JSON.parse(countdownList));
        newEvent = [...JSON.parse(countdownList), { id, title, date }];
    } else {
        newEvent = [{ id: 1, title, date }]
    }
    await AsyncStorage.setItem('events', JSON.stringify(newEvent))

    if (callback) {
        callback();
    }
};

const updateCountdown = dispatch => async (id, title, date, callback) => {
    const countdownList = await AsyncStorage.getItem('events');
    const newList = await JSON.parse(countdownList).filter(x => x.id != id);
    const updatedEvent = [...newList, { id, title, date }];
    
    await AsyncStorage.setItem('events', JSON.stringify(updatedEvent));

    if (callback) {
        callback();
    }
};

const deleteCountdown = dispatch => async (id, callback) => {
    const countdownList = await AsyncStorage.getItem('events');
    const newList = await JSON.parse(countdownList).filter(x => x.id != id);
    await AsyncStorage.setItem('events', JSON.stringify(newList));

    if (callback) {
        callback();
    }
};

const generateRandomId = async (arr) => {
    let id = 0;

    do {
        id = Math.floor(Math.random() * 99999);

        if (id == 0) {
            id += 1;
        }
    } while (arr.filter(x => x.id == id).length > 0);

    return id;
}

export const { Provider, Context } = createDataContext(
    countdownReducer,
    {
        fetchCountdownList,
        createCountdown,
        updateCountdown,
        deleteCountdown
    },
    []
);