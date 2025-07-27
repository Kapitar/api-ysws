interface TerminalPlaceholderProps {
  fetchUrl?: string;
}

export default function TerminalPlaceholder({
  fetchUrl,
}: TerminalPlaceholderProps) {
  return (
    <div className="p-4 border-2 border-gray-700 rounded-2xl mt-10">
      <p>
        <span className="text-green-600 font-bold">orpheus@hackclub:</span>
        <span className="text-blue-600 font-bold">~</span>
        <span className="text-white font-bold">$ </span>
        <span className="text-blue-600">curl </span>
        {fetchUrl}
      </p>
    </div>
  );
}
