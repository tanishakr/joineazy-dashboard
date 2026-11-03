function ConfirmModal({ title, message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="bg-surface border border-line rounded-xl p-6 max-w-sm w-full"
      >
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-muted mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="border border-line rounded-lg px-4 py-2 hover:bg-page"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary hover:bg-primary-hover text-white rounded-lg px-4 py-2"
          >
            Yes, confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal