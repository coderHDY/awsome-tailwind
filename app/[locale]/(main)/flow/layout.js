export default function FlowLayout({ children }) {
  return (
    <div className="flex flex-col bg-base-100">
      <main className="flex flex-col flex-1">{children}</main>
    </div>
  );
}
