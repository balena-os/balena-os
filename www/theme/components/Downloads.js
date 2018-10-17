import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import styled, { withTheme } from 'styled-components';
import { Flex, Box, Container, Image, Link, Heading } from 'resin-components';
import { assets } from 'landr';

import Table from '../components/Table';

import backgroundShape from '../images/background.svg';

const DownloadsWrapper = styled(Box)`
  background-image: url(${backgroundShape});
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
`;

const Card = styled(Flex)`
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: -10px 9px 21px 0 rgba(152, 173, 227, 0.08);
  border: solid 1px rgba(193, 199, 221, 0.6);
  background: #fff;
  cursor: pointer;

  transition: border-color 0.1s ease-in;

  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
  }

  &.active {
    border-color: ${props => props.theme.colors.primary.main};
  }
`;

const slugify = string => _.toLower(_.replace(string, ' ', ''));
const cache = {};

class Downloads extends Component {
  state = { selectedBoardFamily: null, boardPosition: 0, availableDevices: [] };

  setActive = ({ boardFamily, boardPosition }) => {
    this.setState({ selectedBoardFamily: boardFamily, boardPosition }, () =>
      this.getFamilyDevices(boardFamily),
    );
  };

  getFamilyDevices = selectedBoardFamily => {
    const allDevices = _.get(this.props, 'settings.downloads.categories', []);

    if (!selectedBoardFamily) {
      return;
    }

    if (cache[selectedBoardFamily]) {
      this.setState({ availableDevices: cache[selectedBoardFamily] });
      return;
    }

    const devicesObj = allDevices[selectedBoardFamily];

    axios
      .all(
        _.map(devicesObj, device =>
          axios.get(`https://img.resin.io/api/v1/image/${device.id}/versions`),
        ),
      )
      .then(response => {
        const availableDevices = _.map(devicesObj, (device, index) => {
          let version = _.get(response[index], 'data.latest');

          if (version) {
            version = version.replace(/\.prod/, '.dev');
          }

          const downloadUrl =
            'https://files.resin.io/resinos/' +
            device.id +
            '/' +
            encodeURIComponent(version) +
            '/image/resin.img.zip';
          version = `BalenaOS ${version}`;

          return { ...device, version, downloadUrl };
        });

        const sortedDevices = _.sortBy(availableDevices, 'name');
        cache[selectedBoardFamily] = sortedDevices;

        this.setState({ availableDevices: sortedDevices });
      });
  };

  render() {
    const { selectedBoardFamily, availableDevices, boardPosition } = this.state;
    const devices = _.toArray(this.props.settings.downloads.categories);

    // TODO: make it simpler
    // panel must be the last element of the active card's row
    const panelPosition = (Math.floor(boardPosition / 4) + 1) * 4 - 1;
    const panelArrowPosition = boardPosition % 4;

    return (
      <DownloadsWrapper py={120}>
        <Container align="center">
          <Heading.h5
            id="download"
            fontSize={14}
            mb={16}
            color={this.props.theme.colors.primary.main}
          >
            DOWNLOAD
          </Heading.h5>
          <Heading.h1 fontSize={34} mb={40}>
            Select your device type
          </Heading.h1>
          <Flex wrap m={-20}>
            {_.map(devices, (list, index) => {
              const boardFamily = list[0].family;
              const slug = slugify(boardFamily);
              const position = index;
              return (
                <Box
                  width={[1/4, 1 / 4, 1 / 4, 1 / 4]}
                  key={slug}
                  p={20}
                  order={position}
                >
                  <Card
                    onClick={() =>
                      this.setActive({
                        boardFamily,
                        boardPosition: position,
                      })
                    }
                    className={
                      boardFamily === selectedBoardFamily ? 'active' : undefined
                    }
                  >
                    <Image
                      src={assets[`${slug}`]}
                      srcSet={`${assets[`${slug}`]} 1x, ${
                        assets[`${slug}@2x`]
                      } 2x`}
                    />
                  </Card>
                </Box>
              );
            })}
            {!_.isEmpty(availableDevices) && (
              <Box my={20} px={20} order={panelPosition} width={1}>
                <Table
                  devices={availableDevices}
                  arrowPosition={panelArrowPosition}
                />
              </Box>
            )}
          </Flex>
        </Container>
      </DownloadsWrapper>
    );
  }
}

export default withTheme(Downloads);
