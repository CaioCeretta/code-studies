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
Example: A client. Even if a client change its name or his address. The identifier remains the same

• Value Objects: Objects defined only by their attributes, without an identity. **They are immutable.**
Example: Address or Currency. If we change the street, we will have a new address, and not the same modified address

#### Value Objects

Value objects are not simple "data buckets" (struct or DTO classes). But in DDD, they are a first class object, some reasons
are:

• 1 Self validation

A object value is not simply used to store a data, but to ensure that the data is valid since its "birth" (instantiation)

**Example:** If we have an `Email` VO, the business rules that if exist an `at (@)` and a `domain` must always be inside
that VO constructor, and not spread around services or controllers. If the object exist, it is valid.

• 2. Behavior and Domain Logic

a VO can (and should) have methods that execute calculus or transformations related to it.

. Example: in a `Currency` VO, we can have a method `.add(Money other)` or `.applyDiscount(Percentage pct)`.
. Immutability Rule: Since the VO is immutable, these methods do not alter the current object, they return a new instance
with the result.

• 3. We avoid the "Primitive Obsession"

Instead of using a `String` for a CPF, we use the **type** `CPF`. This allows that the rule of "how to validate a CPF" or
"how to format a CPF with a mask" be centralized and reside in only one place, instead of creating utility functions that
are lost inside the project

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
