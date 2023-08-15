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