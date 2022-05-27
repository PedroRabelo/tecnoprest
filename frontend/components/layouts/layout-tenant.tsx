type Props = {
  children: React.ReactNode;
};

export function LayoutTenant({ children }: Props) {
  return (
    <>
      <h1>Cliente</h1>
      {children}
    </>
  );
}
