// const printName = (props) => {
//     console.log(props.name);
// };

// printName({ name: "Ashot" });

// const myName = "Adriana";

// console.log(myName + "<is the best");
// console.log(`${myName} is the best`);

// const data = [
//     { name: "Marvin", email: "marvin@mail.com" },
//     { name: "Darvin", email: "darvin@mail.com" },
//     { name: "Harry Potter", email: "harry@mail.com" },
//     { name: "Kitty", email: "harry@mail.com" },
//     { name: "Petya", email: "harry@mail.com" },
// ];

// const filteredData = data.map((item) => {
//     return item;
// });

// // console.log(filteredData);
// "Narek".includes("N");

// console.log("NAREK".toLowerCase());

// const Component = {
//     state: {
//         search: "",
//         cats: [{ name: "Narek" }, { name: "Shmavon" }],
//     },

//     setState(newData) {
//         this.state = { ...this.state, ...newData };
//     },
// };

// Component.setState({ search: "Narek" });

// console.log(Component.state);

class Person {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }

    printFullName() {
        console.log(this.name + " " + this.surname);
    }
}

// const person1 = {
//     name: "Aram",
//     surname: "Sargysan",
//     printFullName() {
//         console.log(this.name + " " + this.surname);
//     },
// };

// const person2 = {
//     name: "Aram",
//     surname: "Sargysan",
//     printFullName() {
//         console.log(this.name + " " + this.surname);
//     },
// };

// const person3 = {
//     name: "Aram",
//     surname: "Sargysan",
//     printFullName() {
//         console.log(this.name + " " + this.surname);
//     },
// };

console.log(!!{}); // --->>>  falsy values --->>> null, undefinnd, 0, "", false
