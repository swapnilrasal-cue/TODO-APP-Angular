export class User {
    constructor(
        public email: string,
        public _password: string,
        public firstName: string,
        public lastName: string,
        public address: string,
        public gender: string,
        public image: string,
        public loginStatus: boolean = false
    ) { }

    get password() {
        return this._password;
    }
}