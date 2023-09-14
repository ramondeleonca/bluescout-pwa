export const lengthUnits = <const>["m", "cm", "in", "ft"];
export type LengthUnit = typeof lengthUnits[number];

export const weightUnits = <const>["kg", "lb"];
export type WeightUnit = typeof weightUnits[number];

export const driveTrains = <const>["exotic", "hdrive", "holo", "kiwi", "mecanum", "swerve", "tank", "westcoast"];
export type DriveTrain = typeof driveTrains[number];

export const intakeMechanisms = <const>["none", "drop-down-pistons", "drop-down-motors", "gripper-motors", "gripper-pistons", "roller", "door-pistons", "door-motors", "push", "belt", "other"];
export type IntakeMechanism = typeof intakeMechanisms[number];

export const armMechanisms = <const>["none", "pistons", "motors", "other"];
export type ArmMechanism = typeof armMechanisms[number];

export const elevatorMechanism = armMechanisms;
export type ElevatorMechanism = typeof elevatorMechanism[number];

export const sensorsDictionary = <const>{
    "none": "Ninguno",
    "gyro": "Giroscópio",
    "accelerometer": "Acelerômetro",
    "ultrasonic": "Ultrassónico",
    "encoder": "Encoder",
    "limit-switch": "Limit Switch",
    "potentiometer": "Potenciómetro",
    "camera": "Cámara",
    "lidar": "Lidar",
    "other": "Otro"
}
export type Sensor = keyof typeof sensorsDictionary;

export interface Match {
    team_number: number;
    match_number: number;

    cube_a_t: number;
    cube_a_m: number;
    cube_a_b: number;

    cone_a_t: number;
    cone_a_m: number;
    cone_a_b: number;

    cube_t_t: number;
    cube_t_m: number;
    cube_t_b: number;

    cone_t_t: number;
    cone_t_m: number;
    cone_t_b: number;

    auto_charge_att: number;
    auto_charge_lvl: number;

    tele_charge_att: number;
    tele_charge_lvl: number;

    intake_top: number;
    intake_mid: number;
    intake_bottom: number;
    intake_ground: number;

    intake_single: number;
    intake_double: number;

    stopped_sec: number;
}