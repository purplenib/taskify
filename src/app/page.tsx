import LandingBottom from '@components/Home/LandingBottom';
import LandingMain from '@components/Home/LandingMain';
import LandingTop from '@components/Home/LandingTop';
import UnAuthHeader from '@components/Common/UnAuthHeader';

export default function Home() {
  return (
    <>
      <UnAuthHeader />
      <LandingTop />
      <LandingMain />
      <LandingBottom />
    </>
  );
}
