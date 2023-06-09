import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';

async function checkIfFirstLaunch() {
  try {
    const hasFirstLaunched = await AsyncStorage.getItem('@usesr_onboarded');
    if (hasFirstLaunched === null) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

const useGetOnboardingStatus = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [isFirstLaunchIsLoading, setIsFirstLaunchIsLoading] = useState(true);

  React.useEffect(async () => {
    const firstLaunch = await checkIfFirstLaunch();
    setIsFirstLaunch(firstLaunch);
    setIsFirstLaunchIsLoading(false);
  }, []);

  return {
    isFirstLaunch,
    isLoading: isFirstLaunchIsLoading,
  };
};

export default useGetOnboardingStatus;
