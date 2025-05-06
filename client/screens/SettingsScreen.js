import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  StyledContainer,
  PageTitle,
  SectionWrapper,
  SettingOption,
  ToggleSwitch,
  SectionTitle,
  SectionDivider,
} from './../components/styles.js'; // Import styles

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <StyledContainer>
      <PageTitle>Settings</PageTitle>

      {/* 🔹 Account Section */}
      <SectionWrapper>
        <SectionTitle>Account</SectionTitle>
        <SettingOption>
          <Text style={styles.label}>Change Password</Text>
        </SettingOption>
        <SettingOption>
          <Text style={styles.label}>Privacy Settings</Text>
        </SettingOption>
      </SectionWrapper>

      {/* 🔹 Preferences Section */}
      <SectionWrapper>
        <SectionTitle>Preferences</SectionTitle>
        <SettingOption>
          <Text style={styles.label}>Dark Mode</Text>
          <ToggleSwitch
            value={darkMode}
            onValueChange={() => setDarkMode(!darkMode)}
          />
        </SettingOption>
        <SettingOption>
          <Text style={styles.label}>Enable Notifications</Text>
          <ToggleSwitch
            value={notificationsEnabled}
            onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
        </SettingOption>
      </SectionWrapper>

      {/* 🔹 About Section */}
      <SectionWrapper>
        <SectionTitle>About</SectionTitle>
        <SettingOption>
          <Text style={styles.label}>App Version: 1.0.0</Text>
        </SettingOption>
        <SettingOption>
          <Text style={styles.label}>Terms of Service</Text>
        </SettingOption>
      </SectionWrapper>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'black',
  },
});

export default SettingsScreen;
