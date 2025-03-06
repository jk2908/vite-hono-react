import { createContext, useState, use, useEffect, useCallback } from 'react'

type Config = {
	replace?: boolean
}

const DEFAULT_CONFIG: Config = {
	replace: false,
}

export const RouterContext = createContext<{
	route?: string
	routes?: Record<string, React.ReactNode>
	push: (to: string, config?: Config) => string
}>({
	route: undefined,
	routes: {},
	push: () => '',
})

export function RouterProvider({
	initial,
	routes,
	children,
}: {
	initial: string
	routes: Record<string, React.ReactNode>
	children: React.ReactNode
}) {
	const [route, setRoute] = useState(() => initial)

	const push = useCallback((to: string, config?: Config) => {
		const replace = config?.replace ?? DEFAULT_CONFIG.replace

		setRoute(to)

		if (replace) {
			history.replaceState(null, '', to)
		} else {
			history.pushState(null, '', to)
		}

		return to
	}, [])

	useEffect(() => {
		let controller: AbortController | null = new AbortController()
		const { signal } = controller

		window.addEventListener(
			'popstate',
			() => {
				push(location.pathname + location.search, { replace: true })
			},
			{ signal },
		)

		return () => {
			controller?.abort()
			controller = null
		}
	}, [push])

	return <RouterContext value={{ route, routes, push }}>{children}</RouterContext>
}

export function useRouter() {
	return use(RouterContext)
}
