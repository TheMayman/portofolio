import getQueryClient from "@/utils/getQueryClient"
import { Hydrate, dehydrate } from "@tanstack/react-query"

import NavMenu from "@/components/common/NavMenu"
import Introduction from "@/components/Introduction"
import Cursor from "@/components/common/Cursor"
import ScrollSmootherContainer from "@/components/common/ScrollSmootherContainer"
import SmootherRefProvider from "@/contexts/SmootherRefContext"

async function getUser() {
	const res = await fetch(
		"https://cms.xplor.beyond-creation.net/api/form?populate=deep"
	)
	const users = await res.json()
	return users
}
export default async function Home() {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery(["user"], getUser)
	const dehydratedState = dehydrate(queryClient)

	return (
		<Hydrate state={dehydratedState}>
			<Cursor />
			<SmootherRefProvider>
					<NavMenu />
				<ScrollSmootherContainer>
					<div
						className="height"
						style={{
							minHeight: "200vh",
							width: "100%",
							backgroundColor: "darkgrey",
						}}
					></div>
					<Introduction />
				</ScrollSmootherContainer>
			</SmootherRefProvider>
		</Hydrate>
	)
}
