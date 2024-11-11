export default function handleDrop<T>(event: React.DragEvent<T>, fileInputRef: React.RefObject<HTMLInputElement>) {
  event.preventDefault();
  if (!fileInputRef.current) return;

  const dataTransfer = new DataTransfer();
  for (const file of event.dataTransfer.files) dataTransfer.items.add(file);
  fileInputRef.current.files = dataTransfer.files;
  fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
}
