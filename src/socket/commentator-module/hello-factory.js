class Hello {
    constructor(greetings, place, name, car, color) {
        this.greetings = greetings;
        this.place = place;
        this.name = name;
        this.car = car;
        this.color = color;
    }
}

// factory:
class HelloFactory {
    create(place, name) {
        switch(place) {
            case 2:
                return new Hello("Let's welcome our second racer!", place, name, "Mercedes", "gold")
                break;
            case 3:
                return new Hello("Let's welcome our third racer!", place, name, "McLaren", "silver")
                break;
            case 4:
                return new Hello("Let's welcome our fourth racer!", place, name, "Renault", "white")
                break;
            case 5:
                return new Hello("Let's welcome our fifth racer!", place, name, "Ferrari", "red")
                break;
        }
    }
}

export const helloMessageForNext = new HelloFactory();