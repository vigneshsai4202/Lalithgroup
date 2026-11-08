export default function Logo({ variant = 'dark', size = 'md' }) {
  const heights = { sm: 80, md: 100, lg: 130 };
  return (
    <img
      src="/image.png"
      alt="Lalith Group"
      height={heights[size]}
      style={{ height: heights[size], width: 'auto', objectFit: 'contain' }}
    />
  );
}
