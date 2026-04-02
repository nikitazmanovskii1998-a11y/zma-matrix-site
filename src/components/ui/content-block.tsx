type ContentBlockProps = {
  title: string;
  body: string;
  note?: string;
};

export function ContentBlock({ title, body, note }: ContentBlockProps) {
  return (
    <section className="surface-block surface-section">
      <h1 className="page-section-h2 text-balance !font-medium tracking-[0.06em]">
        {title}
      </h1>
      <p className="section-lead mt-4 min-w-0 max-w-[min(65ch,100%)]">{body}</p>
      {note ? (
        <p className="idea-support mt-5 border-l border-neon-line/35 pl-3">
          {note}
        </p>
      ) : null}
    </section>
  );
}
