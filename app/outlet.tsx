import { useRouter } from '#/app/router'

export function Outlet() {
	const { route, routes } = useRouter()

	return (
		<>
			{route ? routes?.[route] : null}
		</>
	)
}
