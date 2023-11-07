import { useState, useEffect } from "react"
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function Admin() {
  const [data, setData] = useState('')
  const axiosPrivate = useAxiosPrivate()
  
  useEffect(() => {
    axiosPrivate.get('roles/admin')
    .then(res => {
      console.log(res)
      setData(res.data)
    },error => {
      setData(
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      )
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>Hello {data.username}!</h1>
      </header>
    </div>
  )
}

export default Admin