type Foo = {
    a?: number;
    b?: string;
    c: boolean;
}

// type Simplify<T> = {

// }

type SetOptional<T, K extends keyof T> = {
    [P in keyof K]?: K[P]
}

type SomeOptional = SetOptional<Foo, 'a' | 'b'>;