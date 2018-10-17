import React from 'react';
import styled, { withTheme } from 'styled-components';
import _ from 'lodash';
import { Flex, Box, Link, Heading, Image } from 'resin-components';
import Button from '../components/Button';
import { assets } from 'landr';

// TODO: make it nicer
const arrowPositionToPercent = [10, 37, 63, 90];
const slugify = string => _.toLower(_.replace(string, ' ', ''));

const StyledLink = styled(Link)`
  && {
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
`;

const BoardImage = styled(Image)`
  && {
    height: 70px;
  }
`;

const TableWrapper = styled(Flex)`
  box-shadow: -10px 9px 21px 0 rgba(152, 173, 227, 0.08);
  border: solid 1px ${props => props.theme.colors.primary.main};
  border-radius: ${props => props.theme.radius}px;
  background-color: #ffffff;
  position: relative;

  &:before {
    content: ' ';
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 12px solid ${props => props.theme.colors.primary.main};

    position: absolute;
    left: calc(${props =>
      props ? arrowPositionToPercent[props.arrowPosition] : 10}% - 6px);
    top: -12px;
    z-index: 2;
    }
    &:after {
      content: ' ';
      width: 0;
      height: 0;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 12px solid #fff;

      position: absolute;
      left: calc(${props =>
        props ? arrowPositionToPercent[props.arrowPosition] : 10}% - 6px);
      top: -11px;
      z-index: 3;
      }
  }

`;

const Table = styled.table`
  width: 100%;

  tr {
    > th,
    td {
      text-align: left;
    }
    > th {
      padding: 14px 20px 14px 0;
    }
    > td {
      padding: 20px 20px 20px 0;
      border-top: 1px solid rgba(214, 221, 242, 0.5);
    }
  }
`;

const TableComponent = props => {
  if (_.isEmpty(props.devices)) {
    return;
  }
  const boardFamily = _.head(props.devices).family;
  const slug = slugify(boardFamily);
  return (
    <TableWrapper {...props} justify="center">
      <Box width={[1, 1, 1, 2 / 3]} py={[40, 40, 40, 80]} px={[20, 20, 20, 0]}>
        <Flex align="center">
          <Box>
            <BoardImage
              src={assets[`${slug}`]}
              srcSet={`${assets[`${slug}`]} 1x, ${assets[`${slug}@2x`]} 2x`}
            />
          </Box>
          <Heading.h2 fontSize={24} bold>
            {boardFamily}
          </Heading.h2>
        </Flex>
        <Table>
          <tr>
            <th>
              <Heading.h6 fontSize={12} color={props.theme.colors.info.main}>
                Model
              </Heading.h6>
            </th>
            <th>
              <Heading.h6 fontSize={12} color={props.theme.colors.info.main}>
                Deployment release
              </Heading.h6>
            </th>
            <th>&nbsp;</th>
          </tr>
          {props.devices.map((device, index) => (
            <tr key={index}>
              <td>
                <Heading.h6 fontSize={14}>{device.name}</Heading.h6>
              </td>
              <td>
                <Heading.h6 fontSize={14}>{device.version}</Heading.h6>
              </td>
              <td>
                <Flex justify="flex-end">
                  <Button round primary>
                    <StyledLink mx={3} blank href={device.downloadUrl}>
                      Download
                    </StyledLink>
                  </Button>
                </Flex>
              </td>
            </tr>
          ))}
        </Table>
      </Box>
    </TableWrapper>
  );
};

export default withTheme(TableComponent);
