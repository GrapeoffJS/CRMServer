export class filterDTO {
    names?: string[];
    surnames?: string[];
    midnames?: string[];
    ages?: number[];
    gender?: string[];
    groups?: string[];
    tutors?: string[];
    balance?: { $gte?: number; $lte?: number; $lt?: number };
}
