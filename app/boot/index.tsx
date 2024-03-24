import { StyleSheet } from 'react-native';
import { useContext, useState } from 'react';
import { Text, useTheme, VStack, HStack, Icon, Wrap, Box, Flex, Divider } from '@react-native-material/core';
import { View } from '@/components/Themed';
import LocalizationContext from "@/locales/index"
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link , Stack} from 'expo-router';

export default function bootPage() {
    const { translations } = useContext(LocalizationContext);
    const [colorModel, setColorModel] = useState(useColorScheme())

    return (
        <View style={styles.container}>
            <Stack.Screen  name="boot" options={{title:'boot'}}>
                <Box w={'100%'} h={'100%'} p={12}>
                    <Flex w={'100%'} h={'100%'} justify='end'>
                        <Wrap h={250} w={'100%'} p={24} style={styles.borderPanel}>

                            <Link style={{ width: '100%' }} href='/user/register'>
                                <HStack w={'100%'} wrap='nowrap'>
                                    <VStack w={'75%'} justify='center'>
                                        <Text variant='h6' color={Colors[colorModel ?? 'light']['textBlue']}>
                                            {translations.title_create_wallet}
                                        </Text>
                                        <Text variant="subtitle2" color={Colors[colorModel ?? 'light']['text_tip_desc']}>
                                            {translations.desc_use_new_wallet}
                                        </Text>
                                    </VStack>
                                    <HStack w={'25%'} justify='end' items='center'>
                                        <AntDesign name="right" size={16} color={Colors[colorModel ?? 'light']['textGray500']} />
                                    </HStack>
                                </HStack>
                            </Link>

                            <Divider style={{ width: '95%' }} leadingInset={12} color={Colors[colorModel ?? 'light']['textGray100']}></Divider>

                            <HStack w={'100%'} wrap='nowrap'>
                                <VStack w={'75%'} justify='center'>
                                    <Text variant='h6' color={Colors[colorModel ?? 'light']['textBlue']}>
                                        {translations.title_recover_wallet}
                                    </Text>
                                    <Text variant="subtitle2" color={Colors[colorModel ?? 'light']['text_tip_desc']}>
                                        {translations.desc_use_mine_wallet}
                                    </Text>
                                </VStack>
                                <HStack w={'25%'} justify='end' items='center'>
                                    <AntDesign name="right" size={16} color={Colors[colorModel ?? 'light']['textGray500']} />
                                </HStack>
                            </HStack>

                        </Wrap>
                    </Flex>

                </Box>
            </Stack.Screen>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    borderPanel: {
        borderRadius: 6,
        borderColor: '#2563eb',
        borderWidth: 1,
        alignContent: 'space-around'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
