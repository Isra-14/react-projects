import { useState, useEffect } from "react"

export const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.log('effect', {enabled})

    const handleMove = (event) => {
      const {clientX, clientY} = event
      // console.log('handleMove', {clientX, clientY})
      setPosition({ x: clientX, y: clientY })
    }

    if(enabled)
      window.addEventListener('pointermove', handleMove)
    
    // Cleanup
    // --> Cuando el componente se desmonta
    // --> Cuando cambian las dependencias
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])


  return (
    <>
      <div style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #000',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -20,
          top: -20,
          width: 40,
          height: 40,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
        <button onClick={()=>setEnabled(!enabled)}>
          {enabled ? 'Desactivar' : 'Activar'} seguir puntero
        </button>
    </>
  )
}