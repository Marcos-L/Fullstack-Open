import { useState, forwardRef, useImperativeHandle } from 'react'

const Toggable = forwardRef(({ name, children }: { name: string, children:React.ReactNode }, ref) => {
  const [state, setState] = useState(false)

  useImperativeHandle(ref, () => {
    return { setState }
  })

  if (state){
    return (
      <div>
        {children}
        <button onClick={() => setState(false)}>Cancel</button>
      </div>
    )
  }
  return (
    <div>
      <button onClick={() => setState(true)}>{name}</button>
    </div>
  )

})

export default Toggable