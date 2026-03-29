type ContentBlockProps = {
  title: string;
  body: string;
  note?: string;
};

export function ContentBlock({ title, body, note }: ContentBlockProps) {
  return (
    <section className="surface-block p-5 md:p-8">
      <h1 className="text-2xl font-medium tracking-[0.08em] text-text-primary md:text-3xl">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl leading-7 text-text-secondary">{body}</p>
      {note ? (
        <p className="mt-5 border-l border-neon-line/35 pl-3 text-sm text-text-secondary">
          {note}
        </p>
      ) : null}
    </section>
  );
}
