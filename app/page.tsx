import { NextPage } from 'next';
import Japan from './components/Japan';

interface HomeProps {}

const Home: NextPage<HomeProps> = () => {
  return (
    <>
      <div className="w-96 h-96">
        <Japan />
      </div>
    </>
  );
};

export default Home;
