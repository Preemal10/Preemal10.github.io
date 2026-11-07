type FlagProps = { country: 'germany' | 'india' | 'eu' };

const names = { germany: 'Germany', india: 'India', eu: 'European Union' };

export default function Flag({ country }: FlagProps) {
  return (
    <svg
      viewBox="0 0 30 20"
      width="27"
      height="18"
      role="img"
      aria-label={names[country]}
      className="shrink-0 overflow-hidden rounded-sm ring-1 ring-white/15"
    >
      <title>{names[country]}</title>
      {country === 'germany' && <>
        <path fill="#000" d="M0 0h30v20H0z" />
        <path fill="#D00" d="M0 6.667h30v6.666H0z" />
        <path fill="#FFCE00" d="M0 13.333h30V20H0z" />
      </>}
      {country === 'india' && <>
        <path fill="#fff" d="M0 0h30v20H0z" />
        <path fill="#FF9933" d="M0 0h30v6.667H0z" />
        <path fill="#138808" d="M0 13.333h30V20H0z" />
        <circle cx="15" cy="10" r="2.7" fill="none" stroke="#000080" strokeWidth="0.35" />
        {Array.from({ length: 24 }, (_, index) => (
          <path key={index} d="M15 10V7.3" stroke="#000080" strokeWidth="0.15" transform={`rotate(${index * 15} 15 10)`} />
        ))}
        <circle cx="15" cy="10" r="0.45" fill="#000080" />
      </>}
      {country === 'eu' && <>
        <path fill="#003399" d="M0 0h30v20H0z" />
        {Array.from({ length: 12 }, (_, index) => {
          const angle = index * Math.PI / 6;
          return <path key={index} fill="#FFCC00" d="M0-1 .225-.31 .951-.309 .364.118 .588.809 0 .382-.588.809-.364.118-.951-.309-.225-.31Z" transform={`translate(${15 + Math.sin(angle) * 6}, ${10 - Math.cos(angle) * 6})`} />;
        })}
      </>}
    </svg>
  );
}
