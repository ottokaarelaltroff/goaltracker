import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Colors } from '../util/Colors';

type SpinnerProps = {
    size?: number | "large" | "small"
    color?: string
    style?: any
}
const Spinner = ({ size = 'large', color = Colors.lightGray, style }: SpinnerProps) => (
    <ActivityIndicator size={size} color={color} style={style} />
);

export default Spinner;