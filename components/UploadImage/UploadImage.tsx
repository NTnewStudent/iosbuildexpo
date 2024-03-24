import React, { useState } from 'react'
import { View } from '@/components/Themed';
import { StyleSheet, Image } from 'react-native';
import { Text, Wrap, Box } from '@react-native-material/core';

export default function UploadImage(props: any) {

  const { onImageChange } = props
  const [imgUri, setImgUri] = useState(null)

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  });

  return (
    <Wrap w='100%' h='100%'>
      <Box>
        {
          imgUri !== null
            ?
            <Image source={{ uri: imgUri }} style={{ width: 200, height: 200 }} ></Image>
            :
            props.children
        }
      </Box>

    </Wrap>
  )
}
