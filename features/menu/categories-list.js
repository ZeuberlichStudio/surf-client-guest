import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { back } from 'react-native/Libraries/Animated/src/Easing';

const API_URL = 'http://172.20.10.2:3001/';

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
            { data.map( ( { slug, images }, i ) => <Category {...{ slug, images, navigation, key: i }}/> ) }
        </ScrollView>
    );
}

const Category = ({ slug, images, navigation }) => (
    <TouchableOpacity 
        onPress={ () => navigation.navigate('Category', { slug, headerImage: `${API_URL}static/${images.title}` }) }
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