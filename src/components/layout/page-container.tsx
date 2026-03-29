type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="relative mx-auto w-full max-w-6xl flex-1 px-3 py-5 md:px-8 md:py-8">
      {children}
    </main>
  );
}
