export declare class User {
    readonly email: string;
    readonly password: string;
    readonly resetToken: string;
    readonly resetTokenExpiration: string;
    readonly id: string;
    readonly salt?: string | undefined;
    constructor(email: string, password: string, resetToken: string, resetTokenExpiration: string, id: string, salt?: string | undefined);
}
