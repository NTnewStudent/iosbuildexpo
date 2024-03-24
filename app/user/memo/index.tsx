import { StyleSheet ,Pressable} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Text, Button, VStack, Wrap, Box, Flex, Dialog, DialogContent, DialogActions } from '@react-native-material/core';
import { View } from '@/components/Themed';
import LocalizationContext from "@/locales/index"
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { findInSecureStore } from '@/store/localstore';
import { UserStoreKey } from '@/store/localstoreKey';
import { decrypt } from "@/utils/ase"
export default function register() {

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },

        borderPanel: {
            borderRadius: 6,
            borderColor: '#2563eb',
            borderWidth: 1,
            width: '100%',
            height: 500,
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
        memoBox: {
            backgroundColor: '#182640',
            height: 240,
            marginTop: 12,
        },
        row: {
            flexDirection: 'row',
            width: '100%',
            backgroundColor: 'transparent',
            borderRadius: 6,
            borderWidth: 2,
            borderColor: '#2f2f2f'
        },
        cell: {
            width: '33.3333%',
            height: 60,
            position: 'relative',
        },
        memo: {
            lineHeight: 55,
            marginLeft: 6
        },
        memoIndex: {
            position: 'absolute',
            top: 6,
            right: 12
        },
        cellCenterBorder: {
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#2f2f2f'
        },
        cellDefBoder: {
            borderBottomWidth: 1,
            borderColor: '#2f2f2f',
        },
        body: {
            textAlign: 'left',
            marginTop:12
        }
    });

    const { translations } = useContext(LocalizationContext);
    const [colorModel, setColorModel] = useState(useColorScheme())
    const [memoList, setMemoList] = useState<string[]>([])

    const pressBackUp = () => {
        console.log("back up")
        // setVisible(true)
        router.push('/user/memo/backup')
    }

    const getBorder = (index: number) => {
        if ([1, 4, 7, 10].includes(index)) {
            return {
                ...styles.cellCenterBorder
            }
        }
        return {
            ...styles.cellDefBoder
        }
    }

    const initMemo = async () => {
        const result = await findInSecureStore(UserStoreKey.REG_CUR_USER_IDCARD) || ''
        const encryMemoBackup = await findInSecureStore(result) || ''
        const dMemo = decrypt(encryMemoBackup)
        const obj = JSON.parse(dMemo)
        const arr =obj.userMemo.split(' ')
        // const arr = mockData();
        setMemoList([...arr])
    }

    const mockData = () => {
        const arr: string[] = ['wave', 'picture', 'resemble', 'glance',
            'crater', 'solve', 'truly', 'mimic', 'nuclear', 'zero', 'conduct', 'buddy']
        setMemoList([...arr])
    }

    const [visible, setVisible] = useState(true)
    useEffect(() => {
        initMemo()
        // mockData()
    }, [])

    return (
        <View style={styles.container}>
            <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                <DialogContent >
                    <Box>
                        <Text variant='h6' style={[{marginTop:12}]}>
                            {translations.title_back_up_can_not_screen}
                        </Text>
                        <Text variant='body2' style={styles.body}>
                            {translations.tips_back_up_can_not_screen}
                        </Text>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        title={translations.title_ok}
                        compact
                        variant="text"
                        onPress={() => setVisible(false)}
                    />
                </DialogActions>
            </Dialog>
            <Box w={'100%'} h={'100%'} p={12}>
                <Flex w={'100%'} h={'100%'} >
                    <VStack>
                        <Text variant='h6' color={Colors['dark']['text']}>
                            {translations.title_backup_memo}
                        </Text>
                        <Text variant='subtitle2' color={Colors['dark']['textGray500']}>
                            {translations.tips_backup_memo}
                        </Text>
                    </VStack>
                    <Wrap mt={32} style={styles.memoBox}>
                        <Wrap style={styles.row}>
                            {
                                memoList.map((e, index) => {
                                    return (
                                        <Box style={[styles.cell, getBorder(index)]} key={e}>
                                            <Text variant='body1' color={Colors['dark'].textBlue} style={styles.memo}>
                                                {e}
                                            </Text>
                                            <Text style={styles.memoIndex} variant='body2' color={Colors[colorModel ?? 'light']['textGray500']}>
                                                {index}
                                            </Text>
                                        </Box>
                                    )
                                })
                            }
                        </Wrap>
                    </Wrap>
                    <Box mt={24}>
                        <Box mt={12}>
                            <Text color={Colors['dark']['textGray500']}>
                                {translations.tips_backup_one}
                            </Text>
                        </Box>
                        <Box mt={12}>
                            <Text color={Colors['dark']['textGray500']}>
                                {translations.tips_backup_two}
                            </Text>
                        </Box>
                    </Box>
                    {/* <VStack mt={48} h={150}>
                        <Button color='#68B0D0' onPress={pressBackUp} style={styles.createBtn} title={translations.title_sure_backup}>
                        </Button>
                    </VStack> */}

                    <VStack mt={48} h={150} style={styles.createBtn} justify="center" items="center">
                        <Pressable onPress={pressBackUp}>
                            <Text color='#f2f2f2' variant='h6'>
                                {translations.title_sure_backup}
                            </Text>
                        </Pressable>
                    </VStack>

                </Flex>

            </Box>
        </View>
    );
}
