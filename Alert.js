import React, { Component, Fragment } from 'react';
import { TouchableOpacity, View, Text, Linking, StyleSheet } from 'react-native';
import moment from 'moment';

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    alert: {
        padding: 10
    },
    alertDate: {
        paddingLeft: 10,
        fontWeight: 'bold'
    },
    opacity: {
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 4,
        padding: 5,
        paddingTop: 6,
        backgroundColor: '#fff',
        borderColor: '#DADADA',
        borderWidth: 1,
        borderLeftWidth: 3,
        borderRightWidth: 3,
    }
});

const openTwitterLink = (url) => {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
}

module.exports = (props) => {
	return (
		<View style={styles.container}>
            {props.alerts.map((alert, i) => {
                if (i < 10) {
                    let formattedTime = moment(alert.date, "ddd MMM Do h:mm:ss Z YYYY").fromNow();
                    return(
                        <TouchableOpacity style={styles.opacity} key={i} onPress={() => openTwitterLink(alert.url)}>
                            <Text style={styles.alertDate}>{formattedTime}</Text>
                            <Text style={styles.alert}>{alert.text}</Text>
                        </TouchableOpacity>
                    )
                }
            })}
        </View>
	)
}