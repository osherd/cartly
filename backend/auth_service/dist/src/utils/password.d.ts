export declare const GeneratePassword: (password: string, salt: string) => Promise<string>;
export declare const ValidatePassword: (enteredPassword: string, savedPassword: string, salt: string) => Promise<boolean>;
export declare const GenerateSignature: (payload: any) => Promise<string>;
