
interface Props {
    type: string
    message: string 
}

const Message = ({type, message}: Props) => {
  return (
    <div className={`${type}`}>
        <p>{message}</p>
    </div>
  )
}

export default Message