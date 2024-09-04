import LandingBottom from '@components/Home/LandingBottom';
import LandingMain from '@components/Home/LandingMain';
import LandingTop from '@components/Home/LandingTop';
import UnAutherHeader from '@components/Common/UnAuthHeader';

export default function Home() {
  return (
    <>
      <UnAutherHeader />
      <LandingTop />
      <LandingMain />
      <LandingBottom />
    </>
  );
}
