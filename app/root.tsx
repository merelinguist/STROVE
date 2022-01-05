import { SSRProvider } from "@react-aria/ssr";
import Inspect from "inspx";
import { LinksFunction, Outlet } from "remix";

import { Document } from "~/components/Document";
import styles from "~/styles.css";
import { useNProgress } from "~/utils/hooks/useNProgress";
import { useRevalidateOnFocus } from "~/utils/hooks/useRevalidateOnFocus";
import { useSplitbee } from "~/utils/hooks/useSplitbee";

export const links: LinksFunction = () => {
	return [{ rel: "stylesheet", href: styles }];
};

export default function App() {
	useNProgress();
	// useRevalidateOnFocus();
	useSplitbee();

	return (
		<Document>
			<SSRProvider>
				<Inspect>
					<Outlet />
				</Inspect>
			</SSRProvider>
		</Document>
	);
}
