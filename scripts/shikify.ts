import { createHighlighter, bundledLanguages } from "shiki"
import { readdirSync, readFileSync, writeFileSync } from "fs"
import { parse } from "node-html-parser"

const posts = "./public"

async function main() {
  const files = await readdirSync(posts, { recursive: true, encoding: "utf-8" })
  const indexFiles = files.filter((file) => file.endsWith("index.html") && file.split("/").length > 3)

  const highlighter = await createHighlighter({
    themes: ["nord"],
    langs: Object.keys(bundledLanguages),
  })

  for (const file of indexFiles) {
    const content = readFileSync(posts + "/" + file, { encoding: "utf-8" })
    const dom = parse(content)

    const codeBlocks = dom.querySelectorAll("pre")

    for (const codeBlock of codeBlocks) {
      const codeChild = codeBlock.childNodes[0]
      if (!codeChild) continue

      const codeElement = parse(codeChild.toString())

      let lang = "text"
      if (codeChild.rawText.startsWith('<code class="language-')) {
        lang = codeChild.rawText.split("language-")[1].split('"')[0]
      }

      const code = codeElement.textContent
      const highlighted = highlighter.codeToHtml(code, {
        lang: lang || "text",
        theme: "nord",
      })

      const newPreElement = parse(highlighted)
      codeBlock.replaceWith(newPreElement)
    }

    const newContent = dom.toString()
    writeFileSync(posts + "/" + file, newContent)
  }
}

main()
