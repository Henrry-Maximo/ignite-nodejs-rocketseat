# Notas de Estudo - Projeto DDD (Domain-Driven Design)

## 🎯 Entidade Instructor

### Localização
`src/domain/entities/instructor.ts`

### Código Final
```typescript
import { randomUUID } from "node:crypto";

export class Instructor {
  /**
   * Identificador único do instrutor
   */
  public id: string;
  public name: string;

  /**
   * @param name Nome do instrutor
   * @param id Identificador único (opcional, será gerado automaticamente se não fornecido)
   */
  constructor(name: string, id?: string) {
    this.id = id ?? randomUUID();
    this.name = name;
  }
}
```

### Conceitos Aplicados

#### 1. **Entidade de Domínio**
- Representa um conceito central do negócio (Instrutor)
- Possui identidade única (propriedade `id`)
- Encapsula regras de negócio relacionadas ao instrutor

#### 2. **Geração de ID Único**
```typescript
this.id = id ?? randomUUID();
```
- **Flexibilidade**: Aceita ID customizado ou gera automaticamente
- **randomUUID()**: Função nativa do Node.js que gera UUID v4
- **Operador Nullish Coalescing (`??`)**: Usa o ID fornecido ou gera um novo se for `null`/`undefined`

#### 3. **Parâmetro Opcional**
```typescript
constructor(name: string, id?: string)
```
- `id?` indica que o parâmetro é opcional
- Permite criar instrutores sem especificar ID manualmente
- Útil para diferentes cenários (criação nova vs. reconstrução de dados existentes)

---

## 📚 Documentação com JSDoc

### Evolução da Documentação

#### Tentativa 1: Comentário Simples
```typescript
public id: string; // Identificador único do instrutor
```
**Limitação**: Apenas visível no código, não aparece no IntelliSense

#### Tentativa 2: JSDoc para Propriedade
```typescript
/**
 * Identificador único do instrutor
 */
public id: string;
```
**Melhoria**: Aparece no hover do VSCode

#### Solução Final: JSDoc com @param
```typescript
/**
 * @param name Nome do instrutor
 * @param id Identificador único (opcional, será gerado automaticamente se não fornecido)
 */
constructor(name: string, id?: string) {
```

### Benefícios do JSDoc
1. **IntelliSense Aprimorado**: Documentação aparece durante o desenvolvimento
2. **Autodocumentação**: Código se torna autoexplicativo
3. **Padrão da Indústria**: Amplamente reconhecido e suportado
4. **Geração de Docs**: Pode ser usado para gerar documentação automática

---

## 🧠 Conceitos de DDD Aplicados

### 1. **Linguagem Ubíqua**
- Termo "Instructor" reflete exatamente como o negócio se refere
- Propriedades (`name`, `id`) usam terminologia do domínio
- Código legível até para não-programadores

### 2. **Entidade vs Value Object**
- `Instructor` é uma **Entidade** porque:
  - Possui identidade única (`id`)
  - Pode mudar ao longo do tempo
  - Dois instrutores com mesmo nome são diferentes pessoas

### 3. **Camada de Domínio**
- Localizada em `src/domain/entities/`
- Independente de frameworks e infraestrutura
- Contém apenas regras de negócio puras

---

## 🔧 Detalhes Técnicos Importantes

### Import com Prefixo `node:`
```typescript
import { randomUUID } from "node:crypto";
```
- **Prefixo `node:`**: Indica módulo nativo do Node.js
- **Vantagem**: Evita conflitos com pacotes npm de mesmo nome
- **Padrão Moderno**: Recomendado para Node.js 16+

### Modificadores de Acesso
```typescript
public id: string;
public name: string;
```
- **`public`**: Explicitamente público (padrão em TypeScript)
- **Boa Prática**: Deixar intenção clara no código
- **Futuro**: Facilita mudanças para `private` ou `protected` se necessário

### Export da Classe
```typescript
export class Instructor {
```
- **Named Export**: Permite importar com `import { Instructor }`
- **Vantagem**: Melhor para tree-shaking
- **Flexibilidade**: Permite múltiplos exports no mesmo arquivo

---

## 🎯 Próximos Passos Sugeridos

### Entidades Adicionais
1. **Student** (Aluno)
2. **Question** (Pergunta/Dúvida)
3. **Answer** (Resposta)

### Value Objects
1. **Email** (validação de formato)
2. **Slug** (para URLs amigáveis)
3. **Content** (conteúdo das perguntas/respostas)

### Casos de Uso
1. **CreateQuestion** (Criar pergunta)
2. **AnswerQuestion** (Responder pergunta)
3. **ListQuestions** (Listar perguntas)

---

## 📖 Referências e Conceitos Estudados

### DDD (Domain-Driven Design)
- **Foco**: Modelar software baseado no domínio do negócio
- **Objetivo**: Código que reflete a realidade do negócio
- **Benefício**: Comunicação clara entre desenvolvedores e especialistas

### Clean Architecture
- **Princípio**: Dependências apontam para dentro (domínio)
- **Camadas**: Domain → Application → Infrastructure → Framework
- **Vantagem**: Testabilidade e independência de frameworks

### TypeScript Best Practices
- **Tipagem Explícita**: Melhor documentação e menos bugs
- **JSDoc**: Documentação integrada ao desenvolvimento
- **Configuração Adequada**: `tsconfig.json` bem configurado

---

## 🔍 Lições Aprendidas

### 1. **Configuração é Fundamental**
- Um `tsconfig.json` mal configurado pode quebrar imports básicos
- Sempre verificar configurações antes de culpar o código

### 2. **Documentação Durante o Desenvolvimento**
- JSDoc não é "perda de tempo", é investimento em manutenibilidade
- Código autodocumentado reduz necessidade de documentação externa

### 3. **DDD é Sobre Comunicação**
- Não é apenas padrões de código, é sobre entender o negócio
- Linguagem ubíqua deve estar presente em todo o código

### 4. **Flexibilidade na Criação de Entidades**
- Permitir ID opcional facilita diferentes cenários de uso
- Geração automática de UUID simplifica criação de novas instâncias
