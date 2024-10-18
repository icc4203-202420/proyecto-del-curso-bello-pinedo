import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BarsScreen = () => {
    return (
        <View style={styles.container}>
    
        <ScrollView style={styles.content}>
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Most visited Bars</Text>
            <View style={styles.barCard}>
                <Icon name="map-marker" size={20} color="#000" />
                <View>
                <Text style={styles.barName}>Oculto Beergarden</Text>
                <Text style={styles.eventDescription}>Descripcion de evento</Text>
                </View>
            </View>
            <View style={styles.barCard}>
                <Icon name="map-marker" size={20} color="#000" />
                <View>
                <Text style={styles.barName}>Barba Azul Apoquindo</Text>
                <Text style={styles.eventDescription}>Descripcion de evento</Text>
                </View>
            </View>
            </View>
        </ScrollView>
        </View>
    );
    }