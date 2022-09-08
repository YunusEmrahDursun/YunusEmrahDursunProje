export enum Prioritys {
    URGENT = 3,
    REGULAR = 2,
    TRIVIAL = 1
}
export enum PriorityColor{
    URGENT = "#cf1322",
    REGULAR = "#d4b106",
    TRIVIAL = "#0050b3"
}
export interface task {
    id:number;
    name: string;
    priority:Prioritys;
}