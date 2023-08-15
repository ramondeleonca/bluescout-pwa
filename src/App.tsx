import { TabContext, TabList, TabPanel } from "@mui/lab";
import MatchPanel from "./panels/MatchPanel";
import { Tab } from "@mui/material";
import Background from "./components/Background";
import RobotPanel from "./panels/RobotPanel";
import useLoaded from "./hooks/useLoaded";
import { Suspense, useState } from "react";
import LoadingPanel from "./panels/LoadingPanel";

export default function App() {
	const loaded = useLoaded();
	const [tab, setTab] = useState("match");

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