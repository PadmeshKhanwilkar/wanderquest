// installed formik, styled-components, expo-constants
// run expo doctor command if dependency conflicts

// React navigation stack
import RootStack from './navigators/RootStack';
import { UserProvider } from './UserContext';
import { FitnessContext } from './Context';

export default function App() {
  return (
    <UserProvider>
      <FitnessContext>
        <RootStack />
      </FitnessContext>
    </UserProvider>
  );
}
