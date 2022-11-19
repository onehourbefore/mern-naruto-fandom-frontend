

export enum TasksEnum {
    CREATE= 'create',
    UPDATE = 'update',
    IDLE = 'idle'
}

export interface EditFormState {
    postID: string
    task: TasksEnum
}