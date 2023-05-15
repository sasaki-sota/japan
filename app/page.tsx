import { NextPage } from 'next';
import Japan from './components/Japan';

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  return (
    <>
      <Japan />
    </>
  );
};

export default Home;
