import React from 'react';
import _ from 'lodash';
import { getSiteProps } from '@resin.io/react-static';

import DocsWrapper from '../pages/Docs';
import Doc from '../components/Doc';

export default getSiteProps(({ docs, location }) => {
	let key = location.pathname.replace('/docs/', '');
	key = _.trim(key, '/');

	const document = <Doc {...docs.find(({ slug }) => slug === key)} />;
	return <DocsWrapper>{document}</DocsWrapper>;
});
