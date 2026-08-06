import useInView from '../../hooks/useInView'
import './Reveal.css'

function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const { ref, inView } = useInView()
  const cls = ['reveal', inView ? 'reveal-visible' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag ref={ref} className={cls} {...rest}>
      {children}
    </Tag>
  )
}

export default Reveal
