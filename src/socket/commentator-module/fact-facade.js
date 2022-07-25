
export const someFact = () => {    
    let rand = Math.floor(Math.random() * 17);
    const factsArr = [
        'The world’s first speeding ticket was issued in 1902',
        '1 in 4 cars on the UK’s road were made in China',
        'A modern Formula 1 car can drive upside down in a tunnel at 120mph',
        '60 million cars are produced every year',
        '1 billion cars are currently in use around the world',
        'The average British driver will spend around 99 days of their life stuck in traffic',
        'It would take less than a month to get to the moon by car',
        'The average car contains over 30,000 unique parts',
        '75% of all cars produced by Rolls Royce are still on the road',
        'Volkswagen owns twelve well-known car brands from 7 European countries',
        'The first ever car accident occurred in 1891',
        'The largest speeding fine ever produced was €1,000,000',
        'The world record for removing and replacing a car engine is 42 seconds',
        'The odds of dying in a car accident are around 1 in 5,000',
        'The man who invented cruise control was blind',
        'The highest total mileage clocked by a single car is 2,850,000 million miles',
        'The Hennessey Venom GT is the world’s fastest production car'
    ];
    return factsArr[rand];
}