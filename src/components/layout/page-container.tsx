type PageContainerProps = {
  children: React.ReactNode;
};

export function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="relative mx-auto w-full min-w-0 max-w-[min(1560px,100%)] flex-1 overflow-x-clip px-4 pb-[max(5.5rem,env(safe-area-inset-bottom)+4.5rem)] pt-6 max-[380px]:px-3 sm:px-5 md:px-8 md:pb-[max(6.5rem,env(safe-area-inset-bottom)+5rem)] md:pt-10">
      {children}
    </main>
  );
}
