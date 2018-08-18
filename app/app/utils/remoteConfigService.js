import firebase from 'react-native-firebase';

export default () => {
    if (__DEV__) {
        firebase.config().enableDeveloperMode();
    }

    firebase.config().fetch(0)
        .then(() => firebase.config().activateFetched())
        .then(() => firebase.config().getValues(['api', 'dev_api']))
        .then((snapshot) => {
            // const api = snapshot.api.val();
            // const devapi = snapshot.dev_api.val();
            // globalScope.api = __DEV__ ? devapi : api
        })
        .catch();
};
