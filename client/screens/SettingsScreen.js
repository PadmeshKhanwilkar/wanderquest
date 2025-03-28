import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { 
  StyledContainer, PageTitle, SectionWrapper, SettingOption, 
  ToggleSwitch, SectionTitle, SectionDivider 
}  from './../components/styles.js';  // Import styles

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
          <Text>Change Password</Text>
        </SettingOption>
        <SettingOption>
          <Text>Privacy Settings</Text>
        </SettingOption>
      </SectionWrapper>

      {/* 🔹 Preferences Section */}
      <SectionWrapper>
        <SectionTitle>Preferences</SectionTitle>
        <SettingOption>
          <Text>Dark Mode</Text>
          <ToggleSwitch 
            value={darkMode} 
            onValueChange={() => setDarkMode(!darkMode)} 
          />
        </SettingOption>
        <SettingOption>
          <Text>Enable Notifications</Text>
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
          <Text>App Version: 1.0.0</Text>
        </SettingOption>
        <SettingOption>
          <Text>Terms of Service</Text>
        </SettingOption>
      </SectionWrapper>
    </StyledContainer>
  );
};

export default SettingsScreen;