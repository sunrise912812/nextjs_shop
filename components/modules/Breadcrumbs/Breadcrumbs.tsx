import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';
import { Crumb } from './Crumb';
import styles from '@/styles/breadcrumbs/index.module.scss';
import { useUnit } from 'effector-react';
import { $mode } from '@/context/mode';
import Link from 'next/link';
import { CrumbHomeSVG } from '@/components/elements/CrumbHomeSVG/CrumbHomeSVG';
import cn from 'classnames';

const generatePathParts = (pathStr: string) => {
	const pathWithoutQuery = pathStr.split('?')[0];
	return pathWithoutQuery.split('/').filter((v) => v.length > 0);
};

export const Breadcrumbs = ({
	getTextGenerator,
	getDefaultTextGenerator,
}: {
	getTextGenerator: (arg0: string, query: ParsedUrlQuery) => string
	getDefaultTextGenerator: (arg0: string, href: string) => string
}) => {
	const router = useRouter();
	const mode = useUnit($mode);
	const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : '';

	const breadcrumbs = useMemo(
		function generateBreadcrumbs() {
			const asPathNestedRoutes = generatePathParts(router.asPath);
			const pathnameNestedRoutes = generatePathParts(router.pathname);

			const crumblist = asPathNestedRoutes.map((subpath, idx) => {
				// Pull out and convert "[post_id]" into "post_id"
				const param = pathnameNestedRoutes[idx]
					.replace('[', '')
					.replace(']', '');

				const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');
				return {
					href,
					textGenerator: getTextGenerator(param, router.query),
					text: getDefaultTextGenerator(subpath, href),
				};
			});

			return [...crumblist];
		},
		[
			router.asPath,
			router.pathname,
			router.query,
			getTextGenerator,
			getDefaultTextGenerator,
		]
	);

	return (
		<div className="container">
			<ul className={styles.breadcrumbs}>
				<li className={styles.breadcrumbs__item}>
					<Link href="/dashboard" passHref>
						<span
							className={cn(styles.breadcrumbs__item__icon, darkModeClass)}
							style={{ marginRight: 0 }}
						>
							<CrumbHomeSVG />
						</span>
					</Link>
				</li>
				{breadcrumbs.map((crumb, idx) =>
					crumb.text ? (
						<li
							key={idx}
							className={cn(styles.breadcrumbs__item, darkModeClass)}
						>
							{/**eslint-disable-next-line @typescript-eslint/ban-ts-comment
               * @ts-ignore */}
							<Crumb {...crumb} last={idx === breadcrumbs.length - 1} />
						</li>
					) : (
						''
					)
				)}
			</ul>
		</div>
	);
};
