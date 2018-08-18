import * as PushNotificationIOS from 'react-native/Libraries/PushNotificationIOS/PushNotificationIOS';
import { Platform } from 'react-native';
import PushNotification from '../asset/react-native-push-notification';

export default () => {
    PushNotification.configure({
        onNotification: (notification) => {
            if (Platform.OS === 'ios') {
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            }
        },
        senderID: '636441313484',
        popInitialNotification: true,
        requestPermissions: true,
    });

    PushNotification.localNotification({
        message: 'Hi :) Did you take attendance today? 🙋 Continuously check in Hermo for 10 days to get 200 Free credits!',
        repeatType: 'day',
        date: new Date(Date.now() + (10 * 1000)), // 10sec
        actions: '["Accept", "Reject"]', // actions
        // title: 'Notification Title',
        // autoCancel: true,
        // largeIcon: 'ic_launcher',
        // smallIcon: 'ic_notification',
        // bigText: 'My big text that will be shown when notification is expanded',
        // subText: 'This is a subText',
        // color: 'green',
        // vibrate: true,
        // vibration: 300,
        // playSound: true,
        // soundName: 'default',
    });
};

