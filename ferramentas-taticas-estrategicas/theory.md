## Strategic Modeling vs Tactical Tools

### 1. Strategic Modeling (Map)

The objective here is to understand the big ball of mud and how it is divided. It is the "macro" level that prevents that
the software become a "big ball of mud"

• **Domains and Subdomains:** It is a company's division.

They are divided in

Core Domain: is where the money is earned;
Supporting Domain: They are the ones that support the core
Generics Domains More generic subdomains, if there is no particular implementation, they can even be imported from other
applications.

• **Bounded Context:** Logic barrier. Inside a context, a word (e.g."Product") have a single meaning. in the context of
"Sales", Product is price and stock. In the "Logistic" context, its weight and dimensions.

• **Ubiquitous Language**: It is the shared vocabulary. Developers and domain experts use the same word inside the code,
the meetings and in the docs.

• Context Map: A diagram that shows how each bounded contexts talk to themselves (Who is the upstream and who is the
downstream, if there is an anti-corruption layer, etc)

### 2. Tactical Modeling (The Pieces)

Here we enter the "micro". They are the patterns that are used to write code inside each bounded context. They are how we
model the business processes in classes or objects

• Entities: Objects that have a **unique identity** that persist over time.

It's worth to reinforce that two entities can have the same attributes, but if the id is different, they are different
objects.
Therefore, different from VOs, the equality of an entity is strictly based on its unique identifier, and not in its attributes
(ex. Two clientes with the same name and CPF still are distinct entities if their ID is not the same).
Example: A client. Even if a client change its name or his address. The identifier remains the same.

• Value Objects: Objects defined only by their attributes, without an identity. **They are immutable.**
Example: Address or Currency. If we change the street, we will have a new address, and not the same modified address

• Agreggates: Aggregates consist of a group of objects (Entities and VOs) that are treated as a single unity to ensure
data consistency. They usually have the "Root of an aggregate" (e.g. Course is the root of an aggregate that consist of
chapters, lessons). Meaning that we never add a `Lesson` isolately, but also the `Course`.

All changes within the aggregate must be treated as a single atomic operation to ensure business invariants are never
broken.

• Domain Services: When a business logic does not naturally belong to a single entity or VO, it becomes a service. Such as
filtering multiple VOs by date

• Repositories: They are used to fetch or save aggregates in the database, hiding technical complexity

#### Value Objects

Value objects are not simple "data buckets" (struct or DTO classes). But in DDD, they are a first class object, some reasons
are:

• 1 Self validation (Protecting Invariants)

A value object ensures that invariants, business rules that must always be true, are satisfied upon instantiation. For
example, an `Email` without an @ symbol is just `invalid`, it is a violation of a domain invariant. By enforcing this in
the constructor, we guarantee the system never handles a corrupted state.

• 2. Behavior and Domain Logic

a VO can (and should) have methods that execute calculus or transformations related to it.

. Example: in a `Currency` VO, we can have a method `.add(Money other)` or `.applyDiscount(Percentage pct)`.
. Immutability Rule: Since the VO is immutable, these methods do not alter the current object, they return a new instance
with the result.

• 3. We avoid the "Primitive Obsession"

Instead of using a `String` for a CPF, we use the **type** `CPF`. This allows that the rule of "how to validate a CPF" or
"how to format a CPF with a mask" be centralized and reside in only one place, instead of creating utility functions that
are lost inside the project

• Pure functions and Side-Effect-Free Functions: VOs are the perfect place for pure functions. Operations in VO are free
of side effects. By summing two values, we get a new one, without the risk of accidentally modifying the original values
in other parts of the app

### Practical Example

Imagine we have a VO called `Address`. It does not only store the street, but it knows the business rules of an address.

```ts
// Exceção customizada de domínio
class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainError";
  }
}

export class Address {
  // The use of 'readonly' ensures the VO immutability
  public readonly zipCode: string;
  public readonly street: string;

  constructor(zipCode: string, street: string) {
    // Business rule validation: The object is "born" valid
    if (!this.isValidZipCode(zipCode)) {
      throw new DomainError("Invalid ZIP Code.");
    }

    this.zipCode = zipCode;
    this.street = street;

    // Congelamos o objeto para evitar alterações em runtime (opcional em TS)
    Object.freeze(this);
  }

  private isValidZipCode(zipCode: string): boolean {
    // Exemplo de regra: CEP brasileiro deve ter 8 dígitos
    const zipCodePattern = /^[0-9]{8}$/;
    return zipCodePattern.test(zipCode);
  }

  // Regra de Negócio: Comportamento dentro do VO
  public isPriorityDeliveryZone(): boolean {
    // Exemplo: CEPs que começam com "0" são da Grande SP (prioridade)
    return this.zipCode.startsWith("0");
  }

  // Value Objects são comparados por valor, não por referência (ID)
  public equals(other: Address): boolean {
    return this.zipCode === other.zipCode && this.street === other.street;
  }
}
```

### Why does it help?

• **Encapsulation:** The logic of "What defines a valid adress" is protected
• **Testability:** It is easier to unitarily test a VO, because it does not depend on DB or external services
• **Ubiquitous Language**: The name of the VO`s method such as `International()` reflect how the expert would talk
