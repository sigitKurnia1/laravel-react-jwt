//Import hook state
import { useState, useEffect } from "react"

//Import hook useNavigate
import { useNavigate } from "react-router-dom"

//Import axios
import axios from "axios"

const Dashboard = () => {
    //State user
    const [user, setUser] = useState({})
    
    //Define navigate
    const navigate = useNavigate()

    //Token
    const token = localStorage.getItem("token")

    //Function "fetchData"
    const fetchData = async () => {
        //Set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        //Fetch data user from Rest API
        await axios.get("http://localhost:8000/api/user")
            .then((response) => {
                setUser(response.data)
            })
    }

    //hook useEffect
    useEffect(() => {
        //Check token empty
        if (!token) {
            navigate("/")
        }

        //Call function "fetchData"
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Function logout
    const logoutHandler = async () => {
        //Set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

        //Fetch Rest API
        await axios.post("http://localhost:8000/api/logout")
            .then(() => {
                //Remove token from localStorage
                localStorage.removeItem("token")

                //Redirect login page
                navigate("/")
            })
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong>
                            <hr />
                            <button onClick={logoutHandler} className="btn btn-md btn-danger">LOGOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
