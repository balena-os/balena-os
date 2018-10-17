import React from 'react';
import _ from 'lodash';
import { getSiteProps } from '@resin.io/react-static';
import { Link } from 'landr';
import { Container, Flex, Box, Link as RLink } from 'resin-components';
import styled from 'styled-components';
import Doc from '../components/Doc';
import Theme from '../theme';

const theme = Theme();

const windowGlobal = typeof window !== 'undefined' && window;

const Wrapper = styled.div`
	background:#f7f7f9
	flex: 1;
	display: flex;
	flex-direction: column;
	margin-top: 1px
`;

const DocContainer = styled(Container)`
	&& {
		box-shadow: 0 0 2px 1px #efefef;
		background: #fff;
		flex: 1;
	}
`;

const List = styled.ul`
	position: sticky;
	top: 125px;
	padding-left: 0;
	list-style: none;
`;
const Item = styled.li`
	padding: 4px;

	a {
		color: ${theme.colors.text.main}
	}
	a.active {
			color: ${theme.colors.primary.main};
		}
	}
`;

const Subheaders = styled(Flex)`
	border-left: 2px solid ${theme.colors.primary.main}90;
	a {
		color: ${theme.colors.text.main};
	}
	a.active {
		color: ${theme.colors.primary.main};
	}
`;

// fix anchor being out of view due to the sticky header
const Documentation = styled(Box)`
	h2 {
		padding-top: 120px;
		margin-top: -120px;
	}
`;

export default getSiteProps(({ children, docs, ...props }) => {
	let pathSlug = null;
	let pathHash = null;
	// Helps with avoiding build errors, due to window being undefined in node
	if (windowGlobal) {
		pathSlug = windowGlobal.location.pathname.replace('/docs/', '');
		pathSlug = _.trim(pathSlug, '/');
		pathHash = windowGlobal.location.hash.substr(1);
	}

	const formattedDocs = docs
		.sort((a, b) => {
			const orderA = a.data.frontmatter.order || 0;
			const orderB = b.data.frontmatter.order || 0;
			return orderA - orderB;
		})
		.map(doc => {
			if (doc.data.frontmatter && doc.data.frontmatter.title) {
				doc.title = doc.data.frontmatter.title;
			}
			return doc;
		});

	return (
		<Wrapper>
			<DocContainer pt={4}>
				<Flex>
					<Box width={1 / 4} p={2} style={{ borderRight: '1px solid #efefef' }}>
						<List>
							{formattedDocs.map(doc => (
								<Item key={doc.slug}>
									<Link
										to={`/docs/${doc.slug}`}
										className={doc.slug === pathSlug ? 'active' : undefined}
									>
										{doc.title}
									</Link>
									{doc.slug === pathSlug && (
										<Subheaders direction="column" mt={3} pl={2}>
											{doc.headings.map((heading, i) => (
												<RLink
													fontSize={1}
													key={i}
													my={1}
													color={theme.colors.gray.dark}
													href={`#${heading.slug}`}
													className={
														heading.slug === pathHash ? 'active' : undefined
													}
												>
													{heading.title}
												</RLink>
											))}
										</Subheaders>
									)}
								</Item>
							))}
						</List>
					</Box>
					<Documentation p={2} width={3 / 4}>
						{children ? children : <Doc {...docs[0]} />}
					</Documentation>
				</Flex>
			</DocContainer>
		</Wrapper>
	);
});
