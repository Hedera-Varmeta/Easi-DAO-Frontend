import Image from 'next/image';
import { AnimateContainer } from './styled';

const Animate = () => {
  return (
    <AnimateContainer>
      <Image
        priority
        src="/images/logo-text.png"
        alt="logo"
        width={92.25}
        height={55.5}
      />
      <Image
        priority
        src="/images/logo.png"
        alt="logo"
        width={76}
        height={30}
      />
      <Image
        priority
        src="/images/dao.png"
        alt="logo"
        width={50}
        height={50}
      />
      <Image
        priority
        src="/images/hedera-hashgraph.png"
        alt="logo"
        width={50}
        height={50}
      />
      <Image
        src="/images/hedera-icon.webp"
        width={150}
        height={150}
        alt="hedera icon"
      />
    </AnimateContainer>
  );
};

export default Animate;