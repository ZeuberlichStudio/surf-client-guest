import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';

const API_URL = 'http://192.168.0.100:3001/';

function Categories({ navigation }) {

    const [data, setData] = React.useState([]);
    const [status, setStatus] = React.useState('idle');

    function fetchCategories() {
        const endpoint = 'categories';

        fetch(API_URL + endpoint)
            .then( data => data.json() )
            .then( data => {
                setStatus('succeeded');
                setData(data);
            })
            .catch( err => {
                setStatus('failed');
                console.log(err);
            });
    }

    React.useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <ScrollView style={{ paddingTop: 10 }}>
            { data.map( ( { _id, images }, i ) => <Category {...{ _id, images, navigation, key: i }}/> ) }
        </ScrollView>
    );
}

const Category = ({ _id, images, navigation }) => (
    <TouchableOpacity 
        onPress={ () => navigation.navigate('Category', { _id, headerImage: `${API_URL}static/${images.title}` }) }
        style={ categoryStyles.container }
    >
        <View>
            <SvgUri uri={`${API_URL}static/${images.title}`}/>
        </View>
    </TouchableOpacity>
);

const categoryStyles = {
    container: {
        marginVertical: 18
    }
}

export default Categories;