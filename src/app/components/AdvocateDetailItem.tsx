
type DetailProps = {
  label?: string
  value: string | number
  className?: string
}

export default function AdvocateDetailItem({ label, value, className }: DetailProps) {
  return (
    <li>
      <p>{`${label ? `${label}: ` : ''}`}
        <span className={`${className ? className : ''} font-bold`}>{value}</span>
      </p>
    </li>
  );
}
