import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface ConfirmDialogProps {
  open: boolean
  title: string
  message?: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = 'Подтвердить',
  cancelLabel = 'Отмена',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onCancel])

  if (!open) return null

  return createPortal(
    <div
      className="confirmDialog__backdrop"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="confirmDialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmDialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirmDialog-title" className="confirmDialog__title">
          {title}
        </h2>
        {message && <p className="confirmDialog__message">{message}</p>}
        <div className="confirmDialog__actions">
          <button
            type="button"
            className="buttonSecondary"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="buttonDanger"
            onClick={onConfirm}
            autoFocus
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default ConfirmDialog
