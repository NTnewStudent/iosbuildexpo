import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { useColorScheme } from "react-native"
import Colors from '@/constants/Colors';
import { Flex, Box, Wrap, Text, VStack, HStack, Button, Avatar } from '@react-native-material/core';
import { AntDesign, MaterialCommunityIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { decrypt } from '@/utils/ase';
import { ScrollView } from 'react-native-gesture-handler';
export default function TabOneScreen() {
  const colorModel = useColorScheme()
  const [dayList, setDayList] = useState(['H', 'D', 'W', 'M', 'Y'])
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    navBar: {

    },
    IconColor: {
      color: Colors[colorModel ?? 'light'].iconColor
    },
    navBarIcon: {
      borderRadius: 25,
      backgroundColor: "#888888",
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    userMoneyInfoPanel: {
      backgroundColor: "#182640",
    },
    boxshadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 2,
      },
      shadowOpacity: 0.6,
      shadowRadius: 12,
      elevation: 3
    },
    radiusBox: {
      backgroundColor: '#5B5F66',
      borderRadius: 4,
      width: 24,
      height: 24,
    },
    textCenter: {
      textAlign: 'center'
    },
    btnOpear: {
      paddingVertical: 6, // 设置垂直内边距
      paddingHorizontal: 6, // 设置水平内边距
    },
    cell: {
      backgroundColor: '#07101C',
      borderRadius: 6
    },
    cellHistory: {
      backgroundColor: '#242630',
      borderRadius: 6
    }

  });

  useEffect(() => {
    const msg = decrypt('ptEUygRoDA7n0rsNKkr8TQglQdHTidc3Y4GJRZqo0b8j42ssDgtSqhB6X6E0Po/2nsfIeZAcQNsnKHfOeSQYlG834aNRmkuSp86znjE9zggk21fs0znH7MU4vpW9ZLQB')
    console.log(msg)
  }, [])

  return (<ScrollView>
    <View style={styles.container}>

      <Box w={'100%'} p={12} style={styles.navBar}>
        <Flex direction='row' items='center' justify='between'>
          <Box h={50} w={50}>
            <View style={styles.navBarIcon}>
              <AntDesign size={32} color={styles.IconColor.color} name="user" />
            </View>
          </Box>
          <Wrap>
            <Box ml={6} mr={6}>
              <MaterialCommunityIcons size={32} color={Colors[colorModel ?? 'light'].iconColor} name="bell-outline" />
            </Box>
            <Box ml={6} mr={6}>
              <MaterialCommunityIcons size={32} color={Colors[colorModel ?? 'light'].iconColor} name="line-scan" />
            </Box>
          </Wrap>
        </Flex>

        <Flex
          style={[styles.userMoneyInfoPanel, styles.boxshadow]}
          w={'100%'} h={150} mt={12} radius={12} p={12}>
          <Wrap w={'100%'} items='center' justify='between'>
            <HStack spacing={6} w={'75%'}>
              <Text variant='h4' color={Colors[colorModel ?? 'light'].textBlue}>
                320.0377
              </Text>
              <Text variant='h4' color={Colors[colorModel ?? 'light'].textBlue}>
                STC
              </Text>
            </HStack>
            <HStack w={'25%'} justify='start'>
              <MaterialCommunityIcons name="eye-outline" size={24} color={styles.IconColor.color} />
            </HStack>
          </Wrap>

          <Wrap w={'100%'} mt={12} items='center' justify='between'>
            <HStack spacing={6} w={'75%'}>
              <Text variant='body1' color={Colors[colorModel ?? 'light'].textInfo}>
                320.0377
              </Text>
              <Text variant='body1' color={Colors[colorModel ?? 'light'].textInfo}>
                USD
              </Text>
            </HStack>
          </Wrap>

          <Wrap w={'100%'} mt={12} items='center' justify='between' spacing={6}>
            <HStack spacing={6}>
              <Text variant='body2' color={Colors[colorModel ?? 'light'].textBlue}>
                TJasugSGtinxsGK4P579j3QgcuhpZLQnkW
              </Text>
              <FontAwesome name='copy' size={16} color={styles.IconColor.color} />
            </HStack>
          </Wrap>
        </Flex>
        {/* 
        <Flex w={'100%'} mt={16} pl={12} pr={12} direction='row' wrap='nowrap' justify='between' items='center'>
          <HStack w={'40%'} items='center'>
            <MaterialCommunityIcons name="power-plug-outline" size={24} color={styles.IconColor.color} />
            <VStack>
              <Text variant='body2' color={Colors[colorModel ?? 'light'].textGray100}>
                View in
              </Text>
              <Text variant='body1' color={Colors[colorModel ?? 'light'].textInfo}>
                Detailed graph
              </Text>
            </VStack>
          </HStack>
          <HStack w={'40%'} spacing={4}>
            {
              dayList.map(element => {
                return (
                  <View key={v4()} style={styles.radiusBox}>
                    <Text
                      style={styles.textCenter}
                      variant='h6' color={Colors[colorModel ?? 'light'].textGray500}>
                      {element}
                    </Text>
                  </View>
                )
              })
            }
          </HStack>
        </Flex> */}

        <Flex direction='row' justify='around' items='center' mt={24} w='100%'>
          <Box>
            <Link href={'/buy'}>
              <Button
                style={styles.btnOpear}
                title="Buy"
                uppercase={false}
                color='#68B0D0'
                tintColor={Colors[colorModel ?? 'light'].text}
                leading={props => <AntDesign name="wallet" size={24} color={Colors[colorModel ?? 'light'].text} />}
              />
            </Link>
          </Box>

          <Box>
            <Button
              style={styles.btnOpear}
              title="Swap"
              uppercase={false}
              color='#68B0D0'
              tintColor={Colors[colorModel ?? 'light'].text}
              leading={props => <AntDesign name="swap" size={24} color={Colors[colorModel ?? 'light'].text} />}
            />
          </Box>

          <Box>
            <Button
              style={styles.btnOpear}
              title="Send"
              uppercase={false}
              color='#68B0D0'
              tintColor={Colors[colorModel ?? 'light'].text}
              leading={props => <FontAwesome name="send" size={22} color={Colors[colorModel ?? 'light'].text} />}
            />
          </Box>
        </Flex>

        <Wrap mt={16} pl={12}>
          <Text variant='h6' color={Colors[colorModel ?? 'light'].text}>
            Finance
          </Text>
        </Wrap>

        <Wrap mt={16} w={'100%'}>
          <Wrap w={'100%'} style={styles.cell} p={12}>
            <HStack w='50%' pl={12} items="center">
              {/* <Avatar image={{ uri: './assets/images/icon1.png' }} /> */}
              <VStack ml={6} spacing={6}>
                <Text variant='body1' color={Colors[colorModel ?? 'light'].textInfo}>
                  STC
                </Text>
                <Text variant='body1' color={Colors[colorModel ?? 'light'].textInfo}>
                  Star Coin
                </Text>
              </VStack>
            </HStack>

            <HStack w='50%' justify='evenly' items='center'>
              <VStack spacing={6}>
                <Text variant='body1' color={Colors[colorModel ?? 'light'].text}>
                  15 150,14
                </Text>
                <Text variant='body2' color={Colors[colorModel ?? 'light'].textGray100}>
                  ~1513424
                </Text>
              </VStack>
              <AntDesign name="wallet" size={24} color={styles.IconColor.color} />
            </HStack>

          </Wrap>
        </Wrap>

        <Wrap mt={16} pl={12}>
          <Text variant='h6' color={Colors[colorModel ?? 'light'].text}>
            History
          </Text>
        </Wrap>
        <Wrap mt={16} pl={24}>
          <Text variant='body1' color={Colors[colorModel ?? 'light'].text}>
            May
          </Text>
        </Wrap>

        <Wrap mt={16} w={'100%'}>
          <Wrap w={'100%'} style={styles.cellHistory} p={12}>
            <HStack w='50%' pl={12} items="center">
              <MaterialIcons name="vertical-align-top" size={24} color={Colors[colorModel ?? 'light'].text} />
              <VStack ml={6} spacing={6}>
                <Text variant='body1' color={Colors[colorModel ?? 'light'].textInfo}>
                  STC
                </Text>
                <Text variant='body1' color={Colors[colorModel ?? 'light'].textInfo}>
                  Star Coin
                </Text>
              </VStack>
            </HStack>

            <HStack w='50%' justify='evenly' items='center'>
              <VStack spacing={6}>
                <Text variant='body1' color={Colors[colorModel ?? 'light'].text}>
                  15 150,14
                </Text>
                <Text variant='body2' color={Colors[colorModel ?? 'light'].textGray100}>
                  ~1513424
                </Text>
              </VStack>
            </HStack>

          </Wrap>
        </Wrap>

        <Wrap mt={16} w={'100%'}>
          <Wrap w={'100%'} style={styles.cellHistory} p={12}>
            <HStack w='50%' pl={12} items="center">
              <MaterialIcons name="vertical-align-bottom" size={24} color={Colors[colorModel ?? 'light'].text} />
              <VStack ml={6} spacing={6}>
                <Text variant='body1' color={Colors[colorModel ?? 'light'].textInfo}>
                  Send
                </Text>
                <Text variant='body1' color={Colors[colorModel ?? 'light'].textInfo}>
                  15 May 10:40
                </Text>
              </VStack>
            </HStack>

            <HStack w='50%' justify='evenly' items='center'>
              <VStack spacing={6}>
                <Text variant='body1' color={Colors[colorModel ?? 'light'].text}>
                  -360.77 STC
                </Text>
                <Text variant='body2' color={Colors[colorModel ?? 'light'].textGray100}>
                  +560,77 STC
                </Text>
              </VStack>
            </HStack>

          </Wrap>
        </Wrap>
      </Box>

    </View>
  </ScrollView>
  );
}


