import { StyleSheet, Pressable } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { Text, VStack, HStack, Icon, Wrap, Box, Flex, Divider } from '@react-native-material/core';
import { View } from '@/components/Themed';
import LocalizationContext from "@/locales/index"
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Link, Stack, router } from 'expo-router';

export default function bootPage() {
  const { translations } = useContext(LocalizationContext);
  const [colorModel, setColorModel] = useState(useColorScheme())
  const toStcWallet = () => {
    router.push('/user/register/')
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: translations.appName
        }}
      />
      <Box w={'100%'} h={'100%'} p={12}>

        <Flex w={'100%'} h={'100%'} items='center' justify='center'>
          <Wrap h={250} w={'100%'} p={24} style={styles.borderPanel}>


            <Pressable onPress={toStcWallet}>
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
            </Pressable>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  borderPanel: {
    borderRadius: 6,
    borderColor: '#68B0D0',
    borderWidth: 1,
    alignContent: 'space-around',
    marginBottom: 32
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
  testLink: {
    fontSize: 24,
    color: '#f2f2f2'
  }
});
