import { StyleSheet, Pressable } from 'react-native';
import { useContext, useState } from 'react';
import { Text, VStack, Box, Flex, Divider, TextInput, IconButton } from '@react-native-material/core';
import { View } from '@/components/Themed';
import LocalizationContext from "@/locales/index"
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { router ,Stack } from 'expo-router';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { getMnemonic } from "@/api/user/index"
import { decrypt } from '@/utils/ase';
import { addToSecureStore } from '@/store/localstore';
import { UserStoreKey } from '@/store/localstoreKey';
import { encrypt } from "@/utils/ase"
type UserFormData = {
    idCard: string,
    userPwd: string,
    userRetryPwd: string,
    userMemo: string,
    [key: string]: string
}

export default function register() {
    const { translations } = useContext(LocalizationContext);
    const [colorModel, setColorModel] = useState(useColorScheme())
    const [formData, setFormData] = useState<UserFormData>({ idCard: '', userPwd: '', userRetryPwd: '', userMemo: '' })

    const onClick = () => {
        try {
            const notEmpty: string[] = ['idCard', 'userPwd', 'userRetryPwd']
            for (let i of notEmpty) {
                console.log(i, formData[i])
                if (formData[i] === '') {
                    console.error('can not empty')
                    return
                }
            }

            // router.push('/user/memo')
            getMnemonic().then((res: any) => {
                console.log(res.data.mnemonic)
                const memo = decrypt(res.data.mnemonic)
                const newForm = {
                    ...formData,
                    ['userMemo']: memo,
                }
                setFormData(newForm);
                console.log('newForm',newForm)
                const jsstr = JSON.stringify(newForm)
                const encrypJsstr = encrypt(jsstr)
                addToSecureStore(newForm.idCard, encrypJsstr)
                addToSecureStore(UserStoreKey.REG_CUR_USER_IDCARD, newForm.idCard)
                router.push('/user/memo')
            })
        } catch (error) {
            console.error(error)
        }

    }

    const onChangeInput = (val: any, key: string) => {
        console.log(val, key)
        setFormData((prevFormData) => ({
            ...prevFormData,
            [key]: val,
        }));
    }
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: translations.page_title_create_account
                }}
            />
            <Box w={'100%'} h={'100%'} p={12}>
                <Flex w={'100%'} h={'100%'} justify='start'>
                    <VStack>
                        <Text variant='h6' color={Colors[colorModel ?? 'light']['text']}>
                            {translations.title_create_id}
                        </Text>
                        <Text variant='subtitle2' color={Colors[colorModel ?? 'light']['textGray500']}>
                            {translations.desc_create_id}
                        </Text>
                    </VStack>
                    <VStack mt={24}>
                        <Text style={{ marginTop: 12 }} color={Colors[colorModel ?? 'light']['blue1']} variant='subtitle1'>
                            {translations.title_id_card}
                        </Text>
                        <TextInput variant="standard"
                            color='#D4D5DA'
                            onChangeText={($event) => onChangeInput($event, 'idCard')}
                            inputStyle={{ color: '#f2f2f2' }}
                            placeholder={translations.tips_input_id_card} style={styles.inputContainer}>
                        </TextInput>
                    </VStack>
                    <VStack mt={24}>
                        <Text color={Colors[colorModel ?? 'light']['blue1']} variant='subtitle1'>
                            {translations.title_create_pwd}
                        </Text>
                        <TextInput
                            variant="standard"
                            color='#D4D5DA'
                            onChangeText={($event) => onChangeInput($event, 'userPwd')}
                            inputStyle={{ color: '#f2f2f2' }}
                            placeholder={translations.tip_input_pwd} style={styles.inputContainer}>
                        </TextInput>
                        <Divider style={{ width: '100%' }} color={Colors[colorModel ?? 'light']['textGray100']}></Divider>
                        <TextInput
                            variant="standard"
                            color='#D4D5DA'
                            onChangeText={($event) => onChangeInput($event, 'userRetryPwd')}
                            inputStyle={{ color: '#f2f2f2' }}
                            trailing={props => (
                                <IconButton icon={props => <Icon name="eye" {...props} />} {...props} />
                            )}
                            placeholder={translations.tip_reset_enter_pwd} style={styles.inputContainer}>
                        </TextInput>
                    </VStack>
                    <VStack mt={48} h={150} style={styles.createBtn} justify="center" items="center">
                        <Pressable onPress={onClick}>
                            <Text color='#f2f2f2' variant='h6'>
                                {translations.title_create_id}
                            </Text>
                        </Pressable>
                    </VStack>
                </Flex>
            </Box>
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
    createBtn: {
        height: 55,
        paddingTop: 9,
        backgroundColor: '#68B0D0',
        borderRadius: 6,
    },
    inputContainer: {
        backgroundColor: '#242630',
        borderRadius: 6,
        borderColor: '#242630',
        color: '#f2f2f2',
        padding: 24,
        fontSize: 16,
        placeholderTextColor: '#D4D5DA',
        selectionColor: '#242630'
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
