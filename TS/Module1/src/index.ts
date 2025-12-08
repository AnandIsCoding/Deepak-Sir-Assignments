// custom types

type mayBeString = string | null | undefined;

// some typeguards

const isString = (val:unknown) : val is string =>{
    return typeof val === 'string'
}


//  ⭐ Capitalize ⭐

const Capitalize = (str: mayBeString) : string =>{
    if(!isString(str) || str.length <= 1) return 'Please Enter a Valid String'
    return str.charAt(0).toUpperCase() + str.slice(1)
}

// ⭐ Snake to camel ⭐

const snakeToCamelCase = (val: mayBeString) : string =>{
     if(!isString(val) || val.length <= 1) return 'Please Enter a Valid String'
     return val.toLowerCase().split('_').map((word,index)=>{
        return index === 0 ? word : word[0]?.toUpperCase() + word.slice(1)  
     }).join('')
}

// ⭐ truncate ⭐
 const truncate = (str : mayBeString, length:number) : string =>{
    if(!isString(str) || str.length <= 1) return 'Please Enter a Valid String'
    return str.slice(0,length)
 }


// usage

// 1️⃣ Capitalize
const userName : string = 'anand jha'
const capitalized = Capitalize(userName)
console.log('Capitalized String : ', capitalized);
console.log('-----------------------');

// 2️⃣ Snake to camel
const snakeCase : string = 'anand_kumar_jha'
const camelCased = snakeToCamelCase(snakeCase)
console.log('Camel case : ',camelCased);
console.log('-----------------------');

// 3️⃣ truncate
const longString : string = 'Hello , This is anand kumar jha , I am learning typescript'
const truncatedString = truncate(longString, 5)
console.log('Truncated value : ',truncatedString);
console.log('-----------------------');