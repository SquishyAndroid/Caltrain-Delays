import React, { Component, Fragment } from 'react';
import {
    RefreshControl,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
import Alert from './Alert.js';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import registerForPushNotificationsAsync from './services/push_notifications';
import { Permissions, Notifications } from 'expo';
import { Header, Divider } from 'react-native-elements';

const styles = StyleSheet.create({
    scroll: {
        paddingBottom: 50,
        backgroundColor: '#f0f0f0',
    },
    header: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    divider: {
        marginTop: 10,
        marginBottom: 10
    }
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: [],
            refreshing: false
        }

        this.onRefresh = this.onRefresh.bind(this);
        this.fetchAlerts = this.fetchAlerts.bind(this);
    }

    fetchAlerts() {
        axios.get("http://textmeif.com/api/alerts")
        .then((response) => {
            this.setState({
                alerts: response.data,
                refreshing: false
            });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount() {
        registerForPushNotificationsAsync();
        this.fetchAlerts();
    }

    onRefresh() {
        this.setState({ refreshing: true });
        this.fetchAlerts();
    }

    render() {
        return (
            <View style={styles.mainContianer}>
                <Header
                    containerStyle={{
                        backgroundColor: '#ff5454',
                        justifyContent: 'space-around',
                    }}
                    centerComponent={
                        {
                            text: 'Caltrain Delays',
                            style: styles.header
                        }
                    }
                />
                <ScrollView
                    style={styles.scroll}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                >
                    <Alert
                        alerts={this.state.alerts}
                    />
                    <View style={{ paddingBottom: 80 }}></View>
                </ScrollView>
            </View>
        );
    }
}
