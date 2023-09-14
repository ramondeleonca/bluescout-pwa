import { AwesomeQRCodeProps } from "@awesomeqr/react";
import ignito from "@/assets/ignito.png";

export const MAX_WEIGHT = 250;
export const MAX_HEIGHT = 350;
export const MAX_WIDTH = 350;
export const MAX_LENGTH = 350;
export const MAX_INTAKE_ACTUATORS = 20;
export const MAX_ELEVATOR_MOTORS = 20;
export const MAX_ARM_ACTUATORS = 20;
export const MAX_DRIVETRAIN_MOTORS = 20;

export const LB_TO_KG = 0.4535147392290249;

export const M_TO_CM = 100;
export const IN_TO_CM = 0.39370078740157477;
export const FT_TO_CM = 0.08333333333333333;

export const BLUESCOUT_QR_VERSION = 0

export const QR_OPTIONS: AwesomeQRCodeProps["options"] = {
    size: 1000,
    logoImage: ignito,
    logoMargin: 5,
    logoCornerRadius: 20,
    components: {
        data: { scale: 1 },
        alignment: { scale: 1 },
        cornerAlignment: { scale: 1 },
        timing: { scale: 1 },
    },
    colorDark: "#080061",
    colorLight: "#ffffff"
}