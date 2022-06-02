import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
`;

const Text = styled.p`
  color: white;
  font-size: 1.125rem;
  line-height: 1.50rem;
  @media (min-width: 640px) {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;

const Heart = styled.span`
  color: #818cf8;
`;

const Footer = () => {
  return (
    <Container>
      <Text>Made with <Heart>❤</Heart> by Gabriel Garcia</Text>
    </Container>
  );
}

export default Footer;