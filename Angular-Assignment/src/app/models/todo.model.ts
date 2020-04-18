export class Todo {
    constructor(
        public title: string,
        public startDate: Date,
        public dueDate: Date,
        public isPublic: boolean,
        public category: string,
        public description: string,
        public status: string,
        public id: string
    ) { 

    }

    
}