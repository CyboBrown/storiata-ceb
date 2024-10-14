import "react-native-url-polyfill/auto";
import { useContributorContext } from "../../../src/contexts/ContributorContext";
import Dashboard from "../(dashboard)/user";
import ContributorDashboard from "../(dashboard)/contributor";

export default function Homepage() {
  const { isContributor } = useContributorContext();

  return (
    <>
      {isContributor ? <ContributorDashboard/> : <Dashboard/>}
    </>
  );
}
