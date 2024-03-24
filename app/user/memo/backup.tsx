import { View } from '@/components/Themed';
import { Text, Box, VStack, HStack, Wrap, Button, Flex } from '@react-native-material/core';
import { StyleSheet, Modal } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import LocalizationContext from "@/locales/index"
import Colors from '@/constants/Colors';
import { useColorScheme, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { findInSecureStore } from '@/store/localstore';
import { UserStoreKey } from '@/store/localstoreKey';
import { decrypt } from '@/utils/ase';
import { router } from 'expo-router';
type CheckItem = {
    memo: string,
    status: boolean,
    [key: string]: string | boolean
}

export default function backup() {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 12,
            position: 'relative'
        },
        memoBox: {
            backgroundColor: '#182640',
            height: 260,
            width: '100%',
            marginTop: 24,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#182640',
            position: 'relative',
            padding: 6
        },
        memoChangeBox: {

        },
        memoBoxItem: {
            padding: 12,
            borderRadius: 6,
            borderColor: '#eeeded',
            borderWidth: 0.5,
        },
        memoBoxItemChange: {
            width: '28.333%',
            padding: 12,
            borderRadius: 6,
            borderColor: '#eeeded',
            borderWidth: 0.5,
            position: 'relative'
        },
        boxItemCacelBox: {
            position: 'absolute',
            top: -5,
            right: -5
        },
        bottomBox: {
            position: 'absolute',
            bottom: 28,
            width: '100%'
        }
    })
    const [memoChangeList, setMemoChangeList] = useState<string[]>([])
    const [memoList, setMemoList] = useState<string[]>([])
    const [curChangeList, setCurChangeList] = useState<CheckItem[]>([])

    const { translations } = useContext(LocalizationContext);
    const [curChangeIndex, setCurChangeIndex] = useState<number>(0)
    const shuffleArray = (array: string[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    //当顺序全部通过时候
    const [fullSuccess, setFullSuccess] = useState<boolean>(true)

    const checkMemoList = (event: any, item: string) => {
        const temp = [...curChangeList]
        let successSize = 0
        const curMemo = memoList[curChangeIndex]
        const newChange: CheckItem = {
            memo: item,
            status: curMemo === item
        }
        temp.push(newChange)
        //遍历之前的状态位置改变以后status的状态
        temp.map((e, i) => {
            if (e.memo === memoList[i]) {
                e.status = true
                successSize += 1
            }
            if (successSize === memoList.length) {
                setFullSuccess(true)
                console.log('full success')
            }
        })

        setCurChangeList([...temp])
        let changeIndex = curChangeIndex
        changeIndex += 1
        setCurChangeIndex(changeIndex)
    }

    const cacelItem = (item: string) => {
        const temp = [...curChangeList]
        let index = 0
        temp.map((e, i) => {
            if (e.memo === item) {
                index = i
            }
        })
        temp.splice(index, 1)

        temp.map((e, i) => {
            if (e.memo === memoList[i]) {
                e.status = true
            }
        })

        let curIndex = curChangeIndex
        curIndex -= 1
        setCurChangeIndex(curChangeIndex)
        setCurChangeList([...temp])
    }
    const initMemo = async () => {
        const result = await findInSecureStore(UserStoreKey.REG_CUR_USER_IDCARD) || ''
        const encryMemoBackup = await findInSecureStore(result) || ''
        const dMemo = decrypt(encryMemoBackup)
        const obj = JSON.parse(dMemo)
        const arr =obj.userMemo.split(' ')
        setMemoList([...arr])
        const t = shuffleArray([...arr])
        setMemoChangeList(t)
    }

    const onNextHome = ()=>{
        if(fullSuccess){
            router.replace('/(tabs)')
        }
    }

    useEffect(() => {
        initMemo()
    }, [])

    return (
        <View style={styles.container}>
            <Text variant='h6'>
                {translations.title_confirm_memo}
            </Text>
            <Text variant='body2' color={Colors['dark']['textGray500']}>
                {translations.tips_check_memo_order}
            </Text>

            <Box style={styles.memoBox}>
                <Flex wrap direction='row' w='100%'>
                    {
                        curChangeList.map((e: CheckItem, i) => {
                            if (e.status === false) {
                                return (
                                    <Box m={6} key={e.memo} style={styles.memoBoxItemChange} >
                                        <Text variant='body1' style={[{ textAlign: 'center' }]} >
                                            {e.memo}
                                        </Text>
                                        <Box style={styles.boxItemCacelBox}>
                                            <AntDesign onPress={($e) => cacelItem(e.memo)} name="closecircle" size={16} color="#f34141" />
                                        </Box>
                                    </Box>
                                )
                            } else {
                                return (
                                    <Box m={6} key={e.memo} style={styles.memoBoxItemChange} >
                                        <Text variant='body1' style={[{ textAlign: 'center' }]} >
                                            {e.memo}
                                        </Text>
                                    </Box>
                                )
                            }

                        })
                    }
                </Flex>

            </Box>

            <Wrap mt={24} spacing={12} wrap>
                {
                    memoChangeList.map((e, index) => {
                        return (
                            <Pressable onPress={($event) => checkMemoList($event, e)} key={e}>
                                <Box style={styles.memoBoxItem} >
                                    <Text variant='body1' >
                                        {e}
                                    </Text>

                                </Box>
                            </Pressable>
                        )
                    })
                }
            </Wrap>

            <Wrap style={styles.bottomBox} justify='center'>
                {
                    fullSuccess
                    ?
                    (
                        <Button onPress={onNextHome} style={[{ width: '50%', height: '100%' }]} color='#2563eb' tintColor='#fff' title={translations.next}>
                        </Button>
                    )
                    :
                    (
                        <Button disableElevation color='#e5e7eb'  style={[{ width: '50%', height: '100%' }]} tintColor='#fff' title={translations.next}>
                        </Button>
                    )
                }
             
            </Wrap>
        </View>
    )
}