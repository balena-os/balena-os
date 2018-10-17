import React from 'react';
import styled, { withTheme } from 'styled-components';
import get from 'lodash/get';
import {
  Container,
  Heading,
  Banner,
  Image,
  Box,
  Flex,
  Text,
  Link as RLink,
} from 'resin-components';
import { Link } from 'landr';
import Button from '../components/Button';

import bg from '../images/hero-bg.svg';

const InlineFlex = styled(Flex)`
  display: inline-flex;
`

const HeroBanner = styled(Banner)`
  display: block;
  background-image: url(${bg});
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% -10%;

  @media all and (max-width: ${props => props.theme.breakpoints[2]}em) {
    text-align: center;
  }
`;

const linkToDownload = () => {
  window.location.hash = '';
  window.location.hash = '#download';
};

export default withTheme(props => {
  const getter = key => get(props, key);
  const { number: versionNumber, name: versionName } = getter(
    'settings.downloads.version',
  );
  return (
    <HeroBanner>
      <Container pt={140} pb={[20, 20, 50]}>
        <Flex justify="center">
          <Box width={[1, 1, 1, 5 / 6]}>
            <Box width={[1, 1, 1, 7 / 10]} mb={[30, 30, 0]}>
              <Heading.h1 fontSize={[30, 35, 45, 52]} mb={25}>
                {getter('settings.lead')}
              </Heading.h1>
            </Box>
            <Flex mx={-10} wrap>
              <Box width={[1, 1, 1, 1 / 2]} px={10} mb={40}>
                <Box width={[1, 1, 1, 11 / 12]}>
                  <Text fontSize={16} mb={35} style={{ lineHeight: '1.6' }}>
                    {getter('settings.description')}
                  </Text>
                </Box>

                <InlineFlex direction='column' align='center'>
                  <Button
                    round
                    primary
                    outline
                    borderless
                    px={5}
                    mb={16}
                    onClick={linkToDownload}
                  >
                    Try BalenaOS
                  </Button>
                  <Text fontSize={10}>
                    Latest version {versionNumber} | {versionName}
                  </Text>
                </InlineFlex>
              </Box>
              <Box width={[1, 1, 1, 1 / 2]} px={10}>
                Image
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </HeroBanner>
  );
});
