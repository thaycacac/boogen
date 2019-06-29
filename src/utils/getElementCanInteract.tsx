export default function getElementCanInteract(event: any) {
  return event.target.closest('[data-element]')
}
