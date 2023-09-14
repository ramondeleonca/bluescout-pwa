import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { Dispatch, SetStateAction } from 'react';

type Props = {
    topConesName?: string;
    middleConesName?: string;
    bottomConesName?: string;
    topCubesName?: string;
    middleCubesName?: string;
    bottomCubesName?: string;

    topConesValue: number;
    middleConesValue: number;
    bottomConesValue: number;
    setTopCones: Dispatch<SetStateAction<number>>;
    setMiddleCones: Dispatch<SetStateAction<number>>;
    setBottomCones: Dispatch<SetStateAction<number>>;

    topCubesValue: number;
    middleCubesValue: number;
    bottomCubesValue: number;
    setTopCubes: Dispatch<SetStateAction<number>>
    setMiddleCubes: Dispatch<SetStateAction<number>>
    setBottomCubes: Dispatch<SetStateAction<number>>

    topImages?: boolean;
    images?: boolean;
}
export default function Grid(props: Props) {
    return (
        <div className="w-full flex-grow flex items-center justify-center">
            <div className="w-1/2 h-full flex flex-col items-center justify-start">
                {props.images || props.topImages && <img className="aspect-square w-40 my-2" src="/cone.jpeg" alt="FRC 2023 Cone - Top" />}
                <FormLabel>Top Cones</FormLabel>
                <div className="flex justify-center mb-4">
                    <Button variant="outlined" onClick={() => props.setTopCones(val => val - 1)}><Remove></Remove></Button>
                    <div className="w-20"><TextField variant="outlined" tabIndex={0} name={props.topConesName ?? "topCones"} className="[&>*]:m-0" fullWidth type="number" placeholder="Top Cones" value={props.topConesValue} onChange={ev => props.setTopCones((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                    <Button variant="outlined" onClick={() => props.setTopCones(val => val + 1)}><Add></Add></Button>
                </div>

                <FormLabel>Middle Cones</FormLabel>
                {props.images && <img className="aspect-square w-40 my-2" src="/cone.jpeg" alt="FRC 2023 Cone - Middle" />}
                <div className="flex justify-center mb-4">
                    <Button variant="outlined" onClick={() => props.setMiddleCones(val => val - 1)}><Remove></Remove></Button>
                    <div className="w-20"><TextField variant="outlined" tabIndex={1} name={props.middleConesName ?? "middleCones"} className="[&>*]:m-0" fullWidth type="number" placeholder="Middle Cones" value={props.middleConesValue} onChange={ev => props.setMiddleCones((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                    <Button variant="outlined" onClick={() => props.setMiddleCones(val => val + 1)}><Add></Add></Button>
                </div>

                <FormLabel>Bottom Cones</FormLabel>
                {props.images && <img className="aspect-square w-40 my-2" src="/cone.jpeg" alt="FRC 2023 Cone - Top" />}
                <div className="flex justify-center mb-4">
                    <Button variant="outlined" onClick={() => props.setBottomCones(val => val - 1)}><Remove></Remove></Button>
                    <div className="w-20"><TextField variant="outlined" tabIndex={2} name={props.bottomConesName ?? "bottomCones"} className="[&>*]:m-0" fullWidth type="number" placeholder="Bottom Cones" value={props.bottomConesValue} onChange={ev => props.setBottomCones((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                    <Button variant="outlined" onClick={() => props.setBottomCones(val => val + 1)}><Add></Add></Button>
                </div>
            </div>
            <div className="w-1/2 h-full flex flex-col items-center justify-start">
                {props.images || props.topImages && <img className="aspect-square w-40 my-2" src="/cube.jpeg" alt="FRC 2023 Cube - Top" />}
                <FormLabel>Top Cubes</FormLabel>
                <div className="flex justify-center mb-4">
                    <Button variant="outlined" onClick={() => props.setTopCubes(val => val - 1)}><Remove></Remove></Button>
                    <div className="w-20"><TextField variant="outlined" tabIndex={3} name={props.topCubesName ?? "topCubes"} className="[&>*]:m-0" fullWidth type="number" placeholder="Top Cubes" value={props.topCubesValue} onChange={ev => props.setTopCubes((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                    <Button variant="outlined" onClick={() => props.setTopCubes(val => val + 1)}><Add></Add></Button>
                </div>

                <FormLabel>Middle Cubes</FormLabel>
                {props.images && <img className="aspect-square w-40 my-2" src="/cube.jpeg" alt="FRC 2023 Cube - Middle" />}
                <div className="flex justify-center mb-4">
                    <Button variant="outlined" onClick={() => props.setMiddleCubes(val => val - 1)}><Remove></Remove></Button>
                    <div className="w-20"><TextField variant="outlined" tabIndex={4} name={props.middleCubesName ?? "middleCubes"} className="[&>*]:m-0" fullWidth type="number" placeholder="Middle Cubes" value={props.middleCubesValue} onChange={ev => props.setMiddleCubes((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                    <Button variant="outlined" onClick={() => props.setMiddleCubes(val => val + 1)}><Add></Add></Button>
                </div>

                <FormLabel>Bottom Cubes</FormLabel>
                {props.images && <img className="aspect-square w-40 my-2" src="/cube.jpeg" alt="FRC 2023 Cube - Top" />}
                <div className="flex justify-center mb-4">
                    <Button variant="outlined" onClick={() => props.setBottomCubes(val => val - 1)}><Remove></Remove></Button>
                    <div className="w-20"><TextField variant="outlined" tabIndex={5} name={props.bottomCubesName ?? "bottomCubes"} className="[&>*]:m-0" fullWidth type="number" placeholder="Bottom Cubes" value={props.bottomCubesValue} onChange={ev => props.setBottomCubes((ev.target as HTMLInputElement).valueAsNumber)}></TextField></div>
                    <Button variant="outlined" onClick={() => props.setBottomCubes(val => val + 1)}><Add></Add></Button>
                </div>
            </div>
        </div>
    )
}