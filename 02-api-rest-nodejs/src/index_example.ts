// type or interface && first letter in english
interface User {
  birthYear: number
}

// follow the format of User
function calculateAgeOfUser(user: User) {
  return new Date().getFullYear() - user.birthYear
}

// calculateAgeOfUser("Diego");
calculateAgeOfUser({
  birthYear: 1
});

// Criação de Projeto
// npm init -y / criar package.json
// npm i -D typescript
// npx tsc --init / criar arquivo tsconfig
// npx tsc src/server.tsx / converter para js
// npm i fastify
// npm install tsx -D

// Runtime Type Checking: unspecified data, accepting any parameter or even empty
// Static Type Checking: specified data, avoiding errors in advance
// install typescript: npm i -D typescript
// run binary codes(shortcut): npx tsc --init
// npx tsc src/index.ts
// node src/server.js

// npm install tsx -D
// npx tsx src/server.ts