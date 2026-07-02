export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-6">
      <div className="w-full max-w-[420px] min-h-[720px] bg-white sm:rounded-[2rem] sm:shadow-2xl sm:border sm:border-slate-200 overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
}
