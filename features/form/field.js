import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export function Field({ 
    style,
    type, 
    value, 
    placeholder, 
    onChange
}) {

    function onChangeText(value) {
        if ( type === 'number' ) onChange(value.replace(/[^0-9]/g, ''));
        else onChange(value);
    }

    return (
        <TextInput
            style={[fieldStyles.input, style]}
            {...{ value, placeholder, onChangeText }}
            keyboardType={ type === 'number' ? 'number-pad' : 'default' }
        />
    );
}

export const FieldWithLabel = ({ label, style, ...props}) => (
    <View style={style}>
        <Text style={fieldStyles.label}>{label}</Text>
        <Field style={fieldStyles.withLabelInput} {...props}/>
    </View>
);

const fieldStyles = StyleSheet.create({
    input: {
        borderBottomColor: '#2E219D',
        borderBottomWidth: 2,
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 28,
        lineHeight: 32,
        color: '#2E219D'
    },
    withLabelContainer: {

    },
    label: {
        marginBottom: -4,
        fontFamily: 'BebasNeuePro-BoldIt',
        fontSize: 16,
        lineHeight: 16,
        color: '#2E219D'
    },
    withLabelInput: {
        fontFamily: 'BebasNeuePro-Middle',
        color: 'black'
    },
});
