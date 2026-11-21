import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const control =
  "block w-full rounded-xl border bg-card px-4 py-3 text-[0.9375rem] text-heading placeholder:text-muted/80 shadow-sm transition-colors " +
  "focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 dark:focus:border-mint dark:focus:ring-mint/15";

const stateCls = (error?: string) => (error ? "border-error focus:border-error focus:ring-error/15" : "border-line");

type FieldProps = { label: string; error?: string; hint?: string; required?: boolean; id: string; className?: string; children: React.ReactNode };

/** Wraps any control with a visible label, hint and accessible error message. */
export function Field({ label, error, hint, required, id, className, children }: FieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-heading">
        {label}
        {required && <span className="ml-0.5 text-error" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-xs text-muted">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id?: string, error?: string, hint?: string) =>
  [error && `${id}-error`, hint && !error && `${id}-hint`].filter(Boolean).join(" ") || undefined;

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { error?: string; hint?: string };
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ className, error, hint, ...props }, ref) {
  return (
    <input
      ref={ref}
      aria-invalid={!!error || undefined}
      aria-describedby={describedBy(props.id, error, hint)}
      className={cn(control, stateCls(error), className)}
      {...props}
    />
  );
});

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string };
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({ className, error, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={4}
      aria-invalid={!!error || undefined}
      aria-describedby={describedBy(props.id, error)}
      className={cn(control, stateCls(error), "resize-y", className)}
      {...props}
    />
  );
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string };
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({ className, error, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      aria-invalid={!!error || undefined}
      aria-describedby={describedBy(props.id, error)}
      className={cn(control, stateCls(error), "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2364748B%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:20px] bg-[right_0.9rem_center] bg-no-repeat pr-10", className)}
      {...props}
    >
      {children}
    </select>
  );
});

/** Visually hidden honeypot — bots fill it, humans never see it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
