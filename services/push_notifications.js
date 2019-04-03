import { Permissions, Notifications, Constants } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

addNewToken = (token) => {
    axios({
        method: 'POST',
        url: 'http://textmeif.com/api/tokens',
        data: JSON.stringify({token}),
        headers: { 'Content-Type': 'application/json'}
    });
}

removeItemValue = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}

export default async () => {
    const previousToken = await AsyncStorage.getItem('pushtoken');
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    } else {
        let token = await Notifications.getExpoPushTokenAsync();
        if (!previousToken) {
            addNewToken(token);
            AsyncStorage.setItem('pushtoken', token);
        }
    }
}