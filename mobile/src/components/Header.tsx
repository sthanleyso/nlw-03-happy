import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
	title: string;
	showCancel?: boolean;
}

export default function Header({ title, showCancel = true }: HeaderProps) {
	const navigation = useNavigation();

	function handleGoBackToAppHomepage() {
		navigation.navigate('OrphanagesMap');
	}

	return (
		<View style={styles.container}>
			<BorderlessButton onPress={navigation.goBack}>
				<Feather name="arrow-left" size={24} color="#15B6D6" />
			</BorderlessButton>

			<Text style={styles.title}>{title}</Text>

			{ showCancel ? (
				<BorderlessButton onPress={handleGoBackToAppHomepage}>
					<Feather name="x" size={24} color="#FF669D" />
				</BorderlessButton>
			) : <View style={styles.blank} /> }
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 24,
		paddingTop: 44,
		borderBottomWidth: 1,
		backgroundColor: '#F9FAFC',
		borderColor: '#DDE3F0',
	},
	title: {
		fontFamily: 'Nunito_600SemiBold',
		fontSize: 16,
		color: '#8FA7B3',
	},
	blank: {
		width: 22
	},
});
