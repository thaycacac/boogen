import { EditorSpaceContainer } from '../container'

export default function updateSelectedElement(id: string) {
  EditorSpaceContainer.setState(
    {
      selectedId: id,
    },
    null,
  )
}
