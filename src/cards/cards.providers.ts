import { Card } from "./entities/card.entity";


export const cardsProviders = [

    {
        provide: 'CARDS_REPOSITORY',
        useValue: Card
    }
]