import Image from "next/image";
import type { ReactNode } from "react";
import type { NotionBlock, NotionRichText } from "@/lib/cms/notion-client";

function RichText({ items }: { items: NotionRichText[] }) {
  return items.map((item, index) => {
    let content: ReactNode = item.plain_text;

    if (item.annotations.code) content = <code>{content}</code>;
    if (item.annotations.bold) content = <strong>{content}</strong>;
    if (item.annotations.italic) content = <em>{content}</em>;
    if (item.annotations.strikethrough) content = <s>{content}</s>;
    if (item.annotations.underline) content = <u>{content}</u>;
    if (item.href) {
      const external = /^https?:\/\//i.test(item.href);
      content = (
        <a href={item.href} rel={external ? "noreferrer" : undefined} target={external ? "_blank" : undefined}>
          {content}
        </a>
      );
    }

    return <span key={`${item.plain_text}-${index}`}>{content}</span>;
  });
}

function textFor(block: NotionBlock) {
  if (block.type === "paragraph") return block.paragraph?.rich_text ?? [];
  if (block.type === "heading_1") return block.heading_1?.rich_text ?? [];
  if (block.type === "heading_2") return block.heading_2?.rich_text ?? [];
  if (block.type === "heading_3") return block.heading_3?.rich_text ?? [];
  if (block.type === "bulleted_list_item") return block.bulleted_list_item?.rich_text ?? [];
  if (block.type === "numbered_list_item") return block.numbered_list_item?.rich_text ?? [];
  if (block.type === "quote") return block.quote?.rich_text ?? [];
  return [];
}

function BlockChildren({ block }: { block: NotionBlock }) {
  return block.children?.length ? <div className="journal-block-children">{renderBlocks(block.children)}</div> : null;
}

function renderStandaloneBlock(block: NotionBlock) {
  const richText = textFor(block);

  switch (block.type) {
    case "paragraph":
      return richText.length ? <p><RichText items={richText} /></p> : <div className="journal-spacer" />;
    case "heading_1":
      return <h2><RichText items={richText} /></h2>;
    case "heading_2":
      return <h3><RichText items={richText} /></h3>;
    case "heading_3":
      return <h4><RichText items={richText} /></h4>;
    case "quote":
      return <blockquote><RichText items={richText} /><BlockChildren block={block} /></blockquote>;
    case "divider":
      return <hr />;
    case "image": {
      const src = block.image?.type === "external" ? block.image.external?.url : block.image?.file?.url;
      if (!src) return null;
      return (
        <figure>
          <Image alt={block.image?.caption.map((item) => item.plain_text).join("") || "Journal image"} height={800} src={src} unoptimized width={1200} />
          {block.image?.caption.length ? <figcaption><RichText items={block.image.caption} /></figcaption> : null}
        </figure>
      );
    }
    default:
      return null;
  }
}

function renderBlocks(blocks: NotionBlock[]): ReactNode[] {
  const rendered: ReactNode[] = [];
  let index = 0;

  while (index < blocks.length) {
    const block = blocks[index];
    if (block.type === "bulleted_list_item" || block.type === "numbered_list_item") {
      const type = block.type;
      const items: NotionBlock[] = [];
      while (index < blocks.length && blocks[index].type === type) {
        items.push(blocks[index]);
        index += 1;
      }
      const List = type === "bulleted_list_item" ? "ul" : "ol";
      rendered.push(
        <List key={block.id}>
          {items.map((item) => (
            <li key={item.id}><RichText items={textFor(item)} /><BlockChildren block={item} /></li>
          ))}
        </List>
      );
      continue;
    }

    const content = renderStandaloneBlock(block);
    if (content) rendered.push(<div key={block.id}>{content}</div>);
    index += 1;
  }

  return rendered;
}

export function NotionArticle({ blocks }: { blocks: NotionBlock[] }) {
  return <div className="journal-body">{renderBlocks(blocks)}</div>;
}
