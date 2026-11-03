function ProgressBar({ percent }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="w-full h-3 bg-line rounded-full overflow-hidden"
    >
      <div
        className="h-full bg-accent rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export default ProgressBar