import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Image, Text, InteractionManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RestScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [timeLeft, setTimeLeft] = useState(3);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);

          // Defer navigation and callback
          InteractionManager.runAfterInteractions(() => {
            if (route.params?.onComplete) {
              route.params.onComplete();
            }
            navigation.goBack();
          });

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <SafeAreaView>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-photo/full-length-athlete-sipping-water-from-fitness-bottle-exhausted-after-workout_1098-18878.jpg?w=360&t=st=1689099570~exp=1689100170~hmac=a60d176d8a393f59b8b032dd294005ceedbd048a04c01e542bcffa815ecd4428',
        }}
        style={{
          width: '100%',
          height: 420,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />

      <Text
        style={{
          fontSize: 30,
          fontWeight: '900',
          marginTop: 50,
          textAlign: 'center',
          color: 'black',
        }}
      >
        TAKE A BREAK!
      </Text>

      <Text
        style={{
          fontSize: 35,
          fontWeight: '900',
          marginTop: 50,
          textAlign: 'center',
          color: 'black',
        }}
      >
        <MaterialIcons name="timer" size={26} /> {timeLeft}
      </Text>
    </SafeAreaView>
  );
};

export default RestScreen;
