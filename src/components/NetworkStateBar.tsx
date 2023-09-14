import useLoaded from "@/hooks/useLoaded";
import SignalWifi1Bar from "@mui/icons-material/SignalWifi1Bar";
import SignalWifi2Bar from "@mui/icons-material/SignalWifi2Bar";
import SignalWifi3Bar from "@mui/icons-material/SignalWifi3Bar";
import SignalWifi4Bar from "@mui/icons-material/SignalWifi4Bar";
import SignalWifiOff from "@mui/icons-material/SignalWifiOff";
import WifiLock from "@mui/icons-material/WifiLock";
import { inRange } from "@/utils";
import { useNetworkState } from "react-use";


const NetworkStateBar = () => {
    let loaded = useLoaded();
    let net = useNetworkState();
    
    return (
        <>
            {
                loaded ? <div className="fixed top-0 right-0 p-2 z-[9999999] flex items-center justify-center bar pointer-events-none transition-[top] duration-200">
                    {
                        net.online ?
                            net.downlink == 0 ? <SignalWifiOff fontSize="large"></SignalWifiOff> :
                            inRange(net.downlink ?? 0, 0.5, 2) ? <SignalWifi1Bar fontSize="large"></SignalWifi1Bar> :
                            inRange(net.downlink ?? 0, 2, 6) ? <SignalWifi2Bar fontSize="large"></SignalWifi2Bar> :
                            inRange(net.downlink ?? 0, 6, 8) ? <SignalWifi3Bar fontSize="large"></SignalWifi3Bar> :
                            inRange(net.downlink ?? 0, 8, 10000) ? <SignalWifi4Bar fontSize="large"></SignalWifi4Bar> :
                            <WifiLock fontSize="large"></WifiLock> :
                        <SignalWifiOff fontSize="large"></SignalWifiOff>
                    }

                    {
                        net.online ? <>
                            <p className="ml-1">{net.downlink}Mbps</p>
                            <p className="ml-1">{net.type === "cellular" ? net.effectiveType : net.type}</p>
                        </> : <>
                            <p className="ml-1">Offline</p>
                        </>
                    }

                </div> : null
            }
        </>
    )
}

NetworkStateBar.displayName = "NetworkStateBar";
export default NetworkStateBar;