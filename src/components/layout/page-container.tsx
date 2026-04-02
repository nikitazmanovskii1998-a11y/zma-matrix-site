type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="relative mx-auto w-full min-w-0 max-w-[min(1560px,100%)] flex-1 overflow-x-clip px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 max-[380px]:px-3 sm:px-5 md:px-8 md:pb-10 md:pt-10">
      {children}
    </main>
  );
}
