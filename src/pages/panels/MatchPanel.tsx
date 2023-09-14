import Grid from "@/components/Grid";
import IncrementalTimer from "@/components/IncrementalTimer";
import { Match } from "@/types";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import MenuItem from "@mui/material/MenuItem";
import { AwesomeQRCode } from "@awesomeqr/react";
import { BLUESCOUT_QR_VERSION, QR_OPTIONS } from "@/constants";
import papaparse from 'papaparse';


export default function MatchPanel() {
    // Reading cache
    const [cache, setCache, removeCache] = useLocalStorage<Match>("match-cache", {} as Match);

    // Read scouter id
    const [scouterId, setScouterId, removeScouterId] = useLocalStorage<string>("scouter-id", "0");

    // Refs
    const formRef = useRef<HTMLFormElement>(null);

    // Team info
    const [teamNumber, setTeamNumber] = useState<number | "">(cache?.team_number ?? "");
    const [matchNumber, setMatchNumber] = useState<number | "">(cache?.match_number ?? "");

    // Autonomous game pieces
    const [autoTopCones, setAutoTopCones] = useState<number>(cache?.cone_a_t ?? 0);
    const [autoMiddleCones, setAutoMiddleCones] = useState<number>(cache?.cone_a_m ?? 0);
    const [autoBottomCones, setAutoBottomCones] = useState<number>(cache?.cone_a_b ?? 0);

    const [autoTopCubes, setAutoTopCubes] = useState<number>(cache?.cube_a_t ?? 0);
    const [autoMiddleCubes, setAutoMiddleCubes] = useState<number>(cache?.cube_a_m ?? 0);
    const [autoBottomCubes, setAutoBottomCubes] = useState<number>(cache?.cube_a_b ?? 0);

    // Teleop game pieces
    const [teleTopCones, setTeleTopCones] = useState<number>(cache?.cone_t_t ?? 0);
    const [teleMiddleCones, setTeleMiddleCones] = useState<number>(cache?.cone_t_m ?? 0);
    const [teleBottomCones, setTeleBottomCones] = useState<number>(cache?.cone_t_b ?? 0);

    const [teleTopCubes, setTeleTopCubes] = useState<number>(cache?.cube_a_t ?? 0);
    const [teleMiddleCubes, setTeleMiddleCubes] = useState<number>(cache?.cube_a_m ?? 0);
    const [teleBottomCubes, setTeleBottomCubes] = useState<number>(cache?.cube_a_b ?? 0);

    // Timer
    const [stoppedSec, setStoppedSec] = useState<number>(cache?.stopped_sec ?? 0);
    const [timerRunning, setTimerRunning] = useState<boolean>(false);

    // Autonomous
    const [autoChargeAttempts, setAutoChargeAttempts] = useState<number>(cache?.auto_charge_att ?? 0);
    const [autoChargeLevel, setAutoChargeLevel] = useState<number>(cache?.auto_charge_lvl ?? 0);

    // Teleop
    const [teleChargeAttempts, setTeleChargeAttempts] = useState<number>(cache?.tele_charge_att ?? 0);
    const [teleChargeLevel, setTeleChargeLevel] = useState<number>(cache?.tele_charge_lvl ?? 0);

    // Intake
    const [intakeBottom, setIntakeBottom] = useState<number>(cache?.intake_bottom ?? 0);
    const [intakeDouble, setIntakeDouble] = useState<number>(cache?.intake_double ?? 0);
    const [intakeGround, setIntakeGround] = useState<number>(cache?.intake_ground ?? 0);
    const [intakeMid, setIntakeMid] = useState<number>(cache?.intake_mid ?? 0);
    const [intakeSingle, setIntakeSingle] = useState<number>(cache?.intake_single ?? 0);
    const [intakeTop, setIntakeTop] = useState<number>(cache?.intake_top ?? 0);

    const [qrCodeText, setQrCodeText] = useState<string>("");

    // Dependencies
    const deps = [
        teamNumber,
        matchNumber,

        autoTopCones,
        autoMiddleCones,
        autoBottomCones,

        autoTopCubes,
        autoMiddleCubes,
        autoBottomCubes,

        teleTopCones,
        teleMiddleCones,
        teleBottomCones,

        teleTopCubes,
        teleMiddleCubes,
        teleBottomCubes,

        // For performance reasons the qr code updates only when the timer is stopped or started
        timerRunning,

        autoChargeAttempts,
        autoChargeLevel,
        
        teleChargeAttempts,
        teleChargeLevel,

        intakeBottom,
        intakeDouble,
        intakeGround,
        intakeMid,
        intakeSingle,
        intakeTop,
    ];

    // Database object
    const dbObject = useMemo((): Match => ({
        team_number: teamNumber as number,
        match_number: matchNumber as number,

        cone_a_t: autoTopCones,
        cone_a_m: autoMiddleCones,
        cone_a_b: autoBottomCones,

        cube_a_t: autoTopCubes,
        cube_a_m: autoMiddleCubes,
        cube_a_b: autoBottomCubes,

        cone_t_t: teleTopCones,
        cone_t_m: teleMiddleCones,
        cone_t_b: teleBottomCones,

        cube_t_t: teleTopCubes,
        cube_t_m: teleMiddleCubes,
        cube_t_b: teleBottomCubes,

        stopped_sec: stoppedSec,

        auto_charge_att: autoChargeAttempts,
        auto_charge_lvl: autoChargeLevel,

        tele_charge_att: teleChargeAttempts,
        tele_charge_lvl: teleChargeLevel,

        intake_bottom: intakeBottom,
        intake_double: intakeDouble,
        intake_ground: intakeGround,
        intake_mid: intakeMid,
        intake_single: intakeSingle,
        intake_top: intakeTop,
    }), deps);

    // Update cache with the database object
    useEffect(() => setCache(dbObject), [dbObject]);

    const clear = () => {
        removeCache();
        formRef.current?.reset();
        window.location.reload();
    };

    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        const qrObject = {
            bs_qr_ver: BLUESCOUT_QR_VERSION,
            scouter_id: scouterId,
            data: papaparse.unparse([dbObject])
        };
        setQrCodeText(JSON.stringify(qrObject));
    }

    return (
        <>
            <div className="container py-2 m-auto flex flex-col flex-wrap items-center justify-start">
                <form ref={formRef} onSubmit={onSubmit}>

                    <div className="w-max my-2 flex items-center justify-end">
                        <Button variant="outlined" onClick={clear}>Reset</Button>
                    </div>

                    <h1 className="text-center text-xl my-2">Game Info</h1>
                    <div className="my-2">
                        <div className="flex items-center justify-center">
                            <TextField required name="team_number" type="number" placeholder="Team Number" variant="outlined" value={teamNumber} onChange={ev => setTeamNumber((ev.target as HTMLInputElement).valueAsNumber)}></TextField>
                            <TextField required name="match_number" type="number" placeholder="Match Number" variant="outlined" value={matchNumber} onChange={ev => setMatchNumber((ev.target as HTMLInputElement).valueAsNumber)}></TextField>
                        </div>

                        <div className="flex items-start justify-between">
                            <div>
                                <FormLabel>Stopped seconds</FormLabel>
                                <IncrementalTimer
                                    name="stopped_sec"
                                    time={stoppedSec}
                                    setTime={setStoppedSec}
                                    running={timerRunning}
                                    setRunning={setTimerRunning}
                                ></IncrementalTimer>
                            </div>

                            <div>
                                <FormLabel>Auto Charge Attempts</FormLabel>
                                <div className="flex justify-center mb-2">
                                    <Button variant="outlined" onClick={() => setAutoChargeAttempts(val => val - 1)}><Remove></Remove></Button>
                                    <div className="w-20"><TextField tabIndex={0} name="auto_charge_att" className="[&>*]:m-0" fullWidth type="number" placeholder="Auto Charge Attempts" value={autoChargeAttempts} onChange={ev => setAutoChargeAttempts((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                                    <Button variant="outlined" onClick={() => setAutoChargeAttempts(val => val + 1)}><Add></Add></Button>
                                </div>
                                <div className="mb-4">
                                    <Select sx={{ margin: "0px" }} fullWidth value={autoChargeLevel} onChange={ev => setAutoChargeLevel(ev.target.value as number)}>
                                        <MenuItem value={0}>Unbalanced</MenuItem>
                                        <MenuItem value={1}>Docked</MenuItem>
                                        <MenuItem value={2}>Engaged</MenuItem>
                                    </Select>
                                </div>
                            </div>
                        </div>

                    </div>

                    <h1 className="text-center text-xl my-2">Autonomous Game Pieces</h1>
                    <div className="my-2">
                        <Grid
                            topConesName="cone_a_t"
                            middleConesName="cone_a_m"
                            bottomConesName="cone_a_b"
                            topCubesName="cube_a_t"
                            middleCubesName="cube_a_m"
                            bottomCubesName="cube_a_b"
                            topImages={true}

                            topConesValue={autoTopCones}
                            middleConesValue={autoMiddleCones}
                            bottomConesValue={autoBottomCones}
                            setTopCones={setAutoTopCones}
                            setMiddleCones={setAutoMiddleCones}
                            setBottomCones={setAutoBottomCones}

                            topCubesValue={autoTopCubes}
                            middleCubesValue={autoMiddleCubes}
                            bottomCubesValue={autoBottomCubes}
                            setTopCubes={setAutoTopCubes}
                            setMiddleCubes={setAutoMiddleCubes}
                            setBottomCubes={setAutoBottomCubes}
                        ></Grid>
                    </div>

                    <h1 className="text-center text-xl my-2">Teleop Game Pieces</h1>
                    <div className="my-2">
                        <Grid
                            topConesName="cone_t_t"
                            middleConesName="cone_t_m"
                            bottomConesName="cone_t_b"
                            topCubesName="cube_t_t"
                            middleCubesName="cube_t_m"
                            bottomCubesName="cube_t_b"

                            topConesValue={teleTopCones}
                            middleConesValue={teleMiddleCones}
                            bottomConesValue={teleBottomCones}
                            setTopCones={setTeleTopCones}
                            setMiddleCones={setTeleMiddleCones}
                            setBottomCones={setTeleBottomCones}

                            topCubesValue={teleTopCubes}
                            middleCubesValue={teleMiddleCubes}
                            bottomCubesValue={teleBottomCubes}
                            setTopCubes={setTeleTopCubes}
                            setMiddleCubes={setTeleMiddleCubes}
                            setBottomCubes={setTeleBottomCubes}
                        ></Grid>
                    </div>

                    <div className="my-2 flex justify-center">
                        <div>
                            <FormLabel>Tele charge attempts</FormLabel>
                            <div className="flex justify-center mb-2">
                                <Button variant="outlined" onClick={() => setTeleChargeAttempts(val => val - 1)}><Remove></Remove></Button>
                                <div className="w-20"><TextField tabIndex={0} name="auto_charge_att" className="[&>*]:m-0" fullWidth type="number" placeholder="Auto Charge Attempts" value={teleChargeAttempts} onChange={ev => setTeleChargeAttempts((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                                <Button variant="outlined" onClick={() => setTeleChargeAttempts(val => val + 1)}><Add></Add></Button>
                            </div>
                        </div>

                        <div className="ml-4 w-56">
                            <FormLabel>Tele charge level</FormLabel>
                            <Select sx={{ margin: "0px" }} fullWidth value={teleChargeLevel} onChange={ev => setTeleChargeLevel(ev.target.value as number)}>
                                <MenuItem value={0}>Unbalanced</MenuItem>
                                <MenuItem value={1}>Docked</MenuItem>
                                <MenuItem value={2}>Engaged</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="my-2 flex items-center justify-center flex-col">
                        <div className="flex justify-between">
                            <div className="">
                                <FormLabel>Intake Bottom</FormLabel>
                                <div className="flex justify-center mb-2">
                                    <Button variant="outlined" onClick={() => setIntakeBottom(val => val - 1)}><Remove></Remove></Button>
                                    <div className="w-20"><TextField tabIndex={0} name="intake_bottom" className="[&>*]:m-0" fullWidth type="number" placeholder="Intake Bottom" value={intakeBottom} onChange={ev => setIntakeBottom((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                                    <Button variant="outlined" onClick={() => setIntakeBottom(val => val + 1)}><Add></Add></Button>
                                </div>
                            </div>

                            <div className="ml-4">
                                <FormLabel>Intake Mid</FormLabel>
                                <div className="flex justify-center mb-2">
                                    <Button variant="outlined" onClick={() => setIntakeMid(val => val - 1)}><Remove></Remove></Button>
                                    <div className="w-20"><TextField tabIndex={0} name="intake_mid" className="[&>*]:m-0" fullWidth type="number" placeholder="Intake Mid" value={intakeMid} onChange={ev => setIntakeMid((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                                    <Button variant="outlined" onClick={() => setIntakeMid(val => val + 1)}><Add></Add></Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="">
                                <FormLabel>Intake Double</FormLabel>
                                <div className="flex justify-center mb-2">
                                    <Button variant="outlined" onClick={() => setIntakeDouble(val => val - 1)}><Remove></Remove></Button>
                                    <div className="w-20"><TextField tabIndex={0} name="intake_double" className="[&>*]:m-0" fullWidth type="number" placeholder="Intake Double" value={intakeDouble} onChange={ev => setIntakeDouble((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                                    <Button variant="outlined" onClick={() => setIntakeDouble(val => val + 1)}><Add></Add></Button>
                                </div>
                            </div>

                            <div className="ml-4">
                                <FormLabel>Intake Single</FormLabel>
                                <div className="flex justify-center mb-2">
                                    <Button variant="outlined" onClick={() => setIntakeSingle(val => val - 1)}><Remove></Remove></Button>
                                    <div className="w-20"><TextField tabIndex={0} name="intake_single" className="[&>*]:m-0" fullWidth type="number" placeholder="Intake Single" value={intakeSingle} onChange={ev => setIntakeSingle((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                                    <Button variant="outlined" onClick={() => setIntakeSingle(val => val + 1)}><Add></Add></Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="">
                                <FormLabel>Intake Ground</FormLabel>
                                <div className="flex justify-center mb-2">
                                    <Button variant="outlined" onClick={() => setIntakeGround(val => val - 1)}><Remove></Remove></Button>
                                    <div className="w-20"><TextField tabIndex={0} name="intake_ground" className="[&>*]:m-0" fullWidth type="number" placeholder="Intake Ground" value={intakeGround} onChange={ev => setIntakeGround((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                                    <Button variant="outlined" onClick={() => setIntakeGround(val => val + 1)}><Add></Add></Button>
                                </div>
                            </div>

                            <div className="ml-4">
                                <FormLabel>Intake Top</FormLabel>
                                <div className="flex justify-center mb-2">
                                    <Button variant="outlined" onClick={() => setIntakeTop(val => val - 1)}><Remove></Remove></Button>
                                    <div className="w-20"><TextField tabIndex={0} name="intake_mid" className="[&>*]:m-0" fullWidth type="number" placeholder="Intake Top" value={intakeTop} onChange={ev => setIntakeTop((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                                    <Button variant="outlined" onClick={() => setIntakeTop(val => val + 1)}><Add></Add></Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <Button variant="contained" type="submit" size="large">Update QR Code</Button>
                    </div>
                </form>


                <div className="aspect-square w-1/6">
                    <AwesomeQRCode options={{...QR_OPTIONS, text: qrCodeText }}></AwesomeQRCode>
                </div>
            </div>
        </>
    );
}
