import { Suspense, lazy } from 'react'

import { ErrorBoundary } from 'react-error-boundary'
import { cxx } from '@jk2908/cxx/'

import { Outlet } from '#/app/outlet'
import { RouterProvider } from '#/app/router'
import { Link } from '#/app/link'
import globalStyles from '#/app/styles.css?url'

const Home = lazy(() => import('#/app/routes/home'))
const SecondPage = lazy(() => import('#/app/routes/page-2'))

const [css, styles, href] = cxx`
	.header {
		display: flex;
		gap: 10px;
	}
`

export function Shell({ route }: { route: string }) {
	return (
		<html lang="en" dir="ltr" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />

				<title>vite-hono-react example</title>

				<script
					type="module"
					src={import.meta.env.PROD ? '/assets/client.js' : '/app/entry.client.tsx'}
				/>

				<link href={globalStyles} rel="stylesheet" />
			</head>

			<body>
				<RouterProvider
					initial={route}
					routes={{
						'/': (
							<Suspense fallback="...">
								<Home />
							</Suspense>
						),
						'/second-page': (
							<Suspense fallback="...">
								<SecondPage />
							</Suspense>
						),
					}}>
					<main>
						<ErrorBoundary
							fallbackRender={({ resetErrorBoundary }) => (
								<button onClick={resetErrorBoundary} type="button">
									Reload
								</button>
							)}>
							<div className={styles.header}>
								<Link href="/">Home</Link>
								<Link href="/second-page">Second Page</Link>
							</div>

							<Suspense fallback={null}>
								<Outlet />
							</Suspense>
						</ErrorBoundary>
					</main>
				</RouterProvider>

				<style precedence="medium" href={href}>
					{css}
				</style>
			</body>
		</html>
	)
}
