export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen bg-white p-4">{children}</div>;
}
