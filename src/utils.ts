import { FT_TO_CM, IN_TO_CM, LB_TO_KG, M_TO_CM } from './constants';
import { LengthUnit, WeightUnit } from './types';

export const inRange = (val: number, min: number, max: number) => val < min ? false : val > max ? false : true;
export const clamp = (val: number, min: number, max: number) => val > max ? max : val < min ? min : val;

/**
 * BEWARE! THIS FUNCTION ONLY CONVERTS TO THE DEFAULT UNIT USED IN THE DATABASE
 * @param val 
 * @param unit 
 */
export const convertToDbUnit = (val: number, unit: LengthUnit | WeightUnit) => {
    switch(unit) {
        case "cm":
            return val;
        case "ft":
            return val * FT_TO_CM;
        case "in":
            return val * IN_TO_CM;
        case "kg":
            return val;
        case "lb":
            return val * LB_TO_KG;
        case "m":
            return val * M_TO_CM;
        default:
            return val;
    }
}

export const parseNum = (val: any) => {
    const parsed = Number(typeof val === "string" ? val.replace(/\D/g, "") : val);
    return isNaN(parsed) ? undefined : parsed;
}