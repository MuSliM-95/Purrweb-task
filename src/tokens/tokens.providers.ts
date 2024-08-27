import { Token } from "./entities/token.entity";


export const tokensProvider = [
    {
        provide: 'TOKENS_REPOSITORY',
        useValue: Token
    }
]