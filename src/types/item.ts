interface PositionProps {
    change: number | null;
    position: string | number;
}

export interface ItemProps {
    id: number;
    keyword: string;
    color: number;
    positionInfo: PositionProps;
    totalApps: number;
    usersPerDay: number;
    selected: boolean;
    suggestionCount: any;
}