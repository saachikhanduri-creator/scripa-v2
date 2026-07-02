interface MicButtonProps {
  recording: boolean;
  onClick: () => void;
}

export default function MicButton({ recording, onClick }: MicButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={recording}
      aria-label={recording ? "Stop recording" : "Start recording"}
      className={`relative flex h-24 w-24 items-center justify-center rounded-full text-white shadow-lg transition-colors ${
        recording ? "bg-red-500" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {recording && (
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="relative h-10 w-10"
      >
        <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" />
        <path d="M19 11a1 1 0 1 0-2 0 5 5 0 0 1-10 0 1 1 0 1 0-2 0 7 7 0 0 0 6 6.93V20H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-2v-2.07A7 7 0 0 0 19 11Z" />
      </svg>
    </button>
  );
}
