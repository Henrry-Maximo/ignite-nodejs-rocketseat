export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  /**
   * @param text(string)
   *
   * Example: "An example title" => "an-example-title"
   */
  static createFromText(text: string) {
    // padronização da string para um arsenal
    const slugText = text
      .normalize('NFKD')
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Substitui espaços por hífen
      .replace(/[^\w-]+/g, '') // Remove tudo que não é palavra ou hífen
      .replace(/_/g, '-') // Substitui sublinhado por hífen
      .replace(/--+/g, '-') // Substitui múltiplos hífen por um
      .replace(/^-|-$/g, '') // Remove hífen do início ou fim

    return new Slug(slugText)
  }
}
