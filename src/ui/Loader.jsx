export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <div className="loader"></div>
        {/* <p className="text-sm text-white">Loading...</p> */}
      </div>
    </div>
  )
}
