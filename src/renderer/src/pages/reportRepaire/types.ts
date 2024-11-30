export interface RepaireArea {
    id: number;
    name: string;
    sub_areas: repaireArea[] | [];
}

export interface ServiceType {
    id: number;
    name: string;
    remark: string;
    repaire_types: RepaireArea[];
}

export interface RepaireType {
    id: number;
    name: string;
}
