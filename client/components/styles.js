import styled from 'styled-components/native';
import {
  View,
  Text,
  Switch,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';

// Colors
export const Colors = {
  primary: '#ffffff',
  secondary: '#e5e7eb',
  tertiary: '#1f2937',
  darkLight: '#9ca3af',
  brand: '#6d28d9',
  green: '#10b981',
  red: '#ef4444',
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

const statusBarOffset =
  Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${statusBarOffset + 30}px;
  background-color: ${primary};
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${secondary};
  margin: 10px auto;
`;

export const WelcomeImage = styled.Image`
  height: 44%;
  margin-bottom: 20px;
`;

export const PageLogo = styled.Image`
  margin-top: 10px;
  width: 100px;
  height: 100px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;

  ${(props) =>
    props.welcome &&
    `
      font-size: 35px;
  `}
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 28px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};

  ${(props) =>
    props.welcome &&
    `
    margin-bottom: 5px;
    font-weight: normal;
  `}
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin: 3px 0 10px 0;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 5px 0;
  height: 60px;

  ${(props) =>
    props.google &&
    `
      background-color: ${green};
      flex-direction: row;
      justify-content: center;
    `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;

  ${(props) =>
    props.google &&
    `
     padding: 3px;
     margin-left: 10px;
    `}
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type === 'SUCCESS' ? green : red)};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin: 10px 0;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;

// Section Wrapper with cross-platform shadow
export const SectionWrapper = styled.View`
  width: 100%;
  padding: 15px;
  background-color: ${primary};
  margin-bottom: 10px;
  border-radius: 8px;
  elevation: 2;

  ${Platform.OS === 'ios' &&
  `
    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.1;
    shadow-radius: 4px;
  `}
`;

export const SettingOption = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${secondary};
`;

export const ToggleSwitch = styled(Switch)`
  transform: scale(1.1);
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${tertiary};
  padding: 10px;
`;

export const SectionDivider = styled.View`
  height: 1px;
  background-color: ${darkLight};
  margin: 10px 0;
`;
