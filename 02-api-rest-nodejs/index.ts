// type or interface && first letter in english
interface User {
  birthYear: number
}

function calculateAgeOfUser(user: User) {
  return new Date().getFullYear() - user.birthYear
}

// calculateAgeOfUser("Diego");
calculateAgeOfUser({
  birthYear: 1
});

// Runtime Type Checking: unspecified data, accepting any parameter or even empty
// Static Type Checking: specified data, avoiding errors in advance
// install typescript: npm i -D typescript