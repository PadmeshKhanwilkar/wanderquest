// installed formik, styled-components, expo-constants
// run expo doctor command if dependency conflicts

// React navigation stack
import RootStack from './navigators/RootStack';
import { UserProvider } from './UserContext';

export default function App() {
  return (
    <UserProvider>
      <RootStack />
    </UserProvider>
  );
}
