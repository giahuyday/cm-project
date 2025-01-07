export type Student = {
    id: number;
    name: string;
    classId: {
        id: number;
        name: string;
    };
};

export type Class = {
    id: number;
    name: string;
};
