import { useContext, useState } from 'react';
import { View } from '@/components/Themed';
import { StyleSheet, Image, ScrollView } from 'react-native';
import { Link, Stack } from 'expo-router';
import LocalizationContext from "@/locales/index"
import { useColorScheme } from 'react-native';
import { Text, Button, Wrap, VStack, HStack , Box } from '@react-native-material/core';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { uploadUserFace } from "@/api/user/index"
import { pubKey } from '@/api/config';
import UploadImage from '@/components/UploadImage/UploadImage';
import { AntDesign } from '@expo/vector-icons';

export default function userinfo() {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 12,
        },
        box:{
            width:'100%',
            height:'100%'
        }
    });

    const { translations } = useContext(LocalizationContext);
    const [colorModel, setColorModel] = useState(useColorScheme())

    const [image, setImage] = useState('');
    const [imageUri, setImageUri] = useState('')
    const [imgBase64, setImgBase64] = useState('')

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0]);
            const uri = result.assets[0].uri
            setImage(result.assets[0].uri);
            setImageUri(result.assets[0].uri)
            convertToBase64(uri)
        }
    };

    const convertToBase64 = async (uri: string) => {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            uploadUserFace(
                base64,
                pubKey
            ).then((res: any) => {
                console.log('upload response->', res)
            })
            // setImgBase64(base64);
        } catch (error) {
            console.log('转换为 Base64 字符串时发生错误:', error);
        }
    };

    const onIdCardImgChange = (uri: string) => {
        console.log(uri)
    }
    return (
        <ScrollView style={styles.box}> 
            <View style={styles.container}>
                <Stack.Screen
                    options={{
                        headerTitle: ''
                    }}
                />
                <Box>
                    <Wrap wrap h={'100%'} w='100%'>
                        <UploadImage title="身份证" color="#f2f2f2" bgColor="#68B0D0" onImageChange={onIdCardImgChange}>
                            <HStack w='100%' h={150} items='center' >
                                <Text variant='body1' color='#fff'>
                                    身份证信息
                                </Text>
                                <HStack style={[{ marginLeft: 24 }]} items='baseline'>
                                    <AntDesign name="idcard" size={150} color="#fff" />
                                    <AntDesign name="upload" size={24} color="#fff" />
                                </HStack>
                            </HStack>
                        </UploadImage>

                        <UploadImage title="身份证" color="#f2f2f2" bgColor="#68B0D0" onImageChange={onIdCardImgChange}>
                            <HStack w='100%' h={150} items='center' >
                                <Text variant='body1' color='#fff'>
                                    身份证信息
                                </Text>
                                <HStack style={[{ marginLeft: 24 }]} items='baseline'>
                                    <AntDesign name="idcard" size={150} color="#fff" />
                                    <AntDesign name="upload" size={24} color="#fff" />
                                </HStack>
                            </HStack>
                        </UploadImage>


                        <UploadImage title="身份证" color="#f2f2f2" bgColor="#68B0D0" onImageChange={onIdCardImgChange}>
                            <HStack w='100%' h={150} items='center' >
                                <Text variant='body1' color='#fff'>
                                    身份证信息
                                </Text>
                                <HStack style={[{ marginLeft: 24 }]} items='baseline'>
                                    <AntDesign name="idcard" size={150} color="#fff" />
                                    <AntDesign name="upload" size={24} color="#fff" />
                                </HStack>
                            </HStack>
                        </UploadImage>
                    </Wrap>
                </Box>

            </View>
        </ScrollView>
    )
}
