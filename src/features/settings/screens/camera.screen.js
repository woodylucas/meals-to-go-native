import { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Text } from "../../../components/typography/text.component";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../../utils/hooks/useAuth";
import { CommonActions } from "@react-navigation/native";
import styled from "styled-components/native";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const InnerSnap = styled.View`
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const CameraScreen = ({ navigation: { goBack } }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    (async () => {
      const { status } = await requestPermission();
      setHasPermission(status === "granted");
    })();
  });

  const handleSnap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      goBack();
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    return <Text>No access to camera </Text>;
  }

  return (
    <TouchableOpacity onPress={handleSnap}>
      <ProfileCamera
        ref={(camera) => (cameraRef.current = camera)}
        type={CameraType.front}
      />
    </TouchableOpacity>
  );
};
