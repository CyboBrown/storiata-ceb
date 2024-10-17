import "react-native-url-polyfill/auto";
import { useContributorContext } from "../../../src/contexts/ContributorContext";
import Dashboard from "../(dashboard)/user";
import ContributorDashboard from "../(dashboard)/contributor";
import { useNavigation, useRouter } from "expo-router";
import CustomHeader from "../../../src/components/HeaderTitle";
import { useLayoutEffect } from "react";

export default function Homepage() {
  const { isContributor } = useContributorContext();

  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomHeader pageTitle="Dashboard" />,  // Use Custom Header
      headerStyle: { backgroundColor: 'dodgerblue' },
      headerTintColor: 'white',
    });
  }, [navigation]);

  return (
    <>
      {isContributor ? <ContributorDashboard/> : <Dashboard/>}
    </>
  );
}
