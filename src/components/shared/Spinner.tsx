export default function Spinner({ size = 12 }: { size?: number }) {
  return (
    <div
      className={`w-${size} h-${size} border-4 border-primary border-t-transparent rounded-full animate-spin`}
    />
  );
}
