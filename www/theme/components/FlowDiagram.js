import React from 'react';
import { Container, Flex, Box, Image } from 'resin-components';
import styled from 'styled-components';
import { assets} from 'landr'

const getImageSet = type => {
  return `${assets[`flow-${type}@1x`]},
  ${assets[`flow-${type}@2x`]} 2x,
  ${assets[`flow-${type}@3x`]} 3x`;
};

const DesktopImage = styled(Image)`
display: none;
@media all and (min-width: ${props => props.theme.breakpoints[2]}em) {
  display: block;
}
`

const MobileImage = styled(Image)`
display: none;
@media all and (max-width: ${props => props.theme.breakpoints[2]}em) {
  display: block;
}
`

export default () => {
  return (
    <Container py={5} px={2}>
      <Flex>
        <Box>
          <DesktopImage
            mx="auto"
            src={assets[`flow-desktop@1x`]}
            srcSet={getImageSet('desktop')}
          />
          <MobileImage
            mx="auto"
            src={assets[`flow-mobile@1x`]}
            srcSet={getImageSet('mobile')}
          />
        </Box>
      </Flex>
    </Container>
  );
};
