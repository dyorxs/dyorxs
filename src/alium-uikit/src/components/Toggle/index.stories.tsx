import { useState } from 'react'
import Toggle from './Toggle'

export default {
  title: 'Components/Toggle',
  component: Toggle,
}

export const Default: FC = () => {
  const [isChecked, setIsChecked] = useState(false)

  const toggle = () => setIsChecked(!isChecked)

  return (
    <>
      <div style={{ marginBottom: '32px' }}>
        <Toggle checked={isChecked} onChange={toggle} />
      </div>
      <div>
        <Toggle checked={isChecked} onChange={toggle} scale='sm' />
      </div>
    </>
  )
}
