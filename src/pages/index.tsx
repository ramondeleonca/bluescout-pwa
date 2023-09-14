import TabContext from "@mui/lab/TabContext";
import MatchPanel from "./panels/MatchPanel";
import Tab from "@mui/material/Tab";
import Background from "./../components/Background";
import RobotPanel from "./panels/RobotPanel";
import useLoaded from "./../hooks/useLoaded";
import { Suspense, useEffect, useState } from "react";
import LoadingPanel from "./panels/LoadingPanel";
import useUrl from "@/hooks/useUrl";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

export default function App() {
	const loaded = useLoaded();
	const url = useUrl();
	const [tab, setTab] = useState(url.searchParams.get("tab") ?? "match");
	useEffect(() => window.history.pushState(null, "", `?tab=${tab}`), [tab]);

	return (
		<>
			<Background loaded={loaded}></Background>
			<div>
				<TabContext value={tab}>
					<div className={`tabs-container bg-white ${!loaded ? "bg-opacity-0" : ""} transition-colors duration-500`}>
						<TabList centered onChange={(ev, val) => setTab(val)}>
							<Tab sx={{ px: "2%" }} value="match" label="Match"></Tab>
							<Tab sx={{ px: "2%" }} value="robot" label="Robot"></Tab>
						</TabList>
					</div>

					<Suspense fallback={<LoadingPanel></LoadingPanel>}>
						<TabPanel value="match">
							<MatchPanel></MatchPanel>
						</TabPanel>
					</Suspense>

					<Suspense fallback={<LoadingPanel></LoadingPanel>}>
						<TabPanel value="robot">
							<RobotPanel></RobotPanel>
						</TabPanel>
					</Suspense>
				</TabContext>
			</div>
		</>
	);
}