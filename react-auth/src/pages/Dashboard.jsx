import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Dashboard = () => {
    const [user, setUser] = useState({})

    const [isLoading, setIsLoading] = useState(false)
    
    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            navigate("/")
            return
        }

        const fetchData = async () => {
            try {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
                const {data} = await axios.get("http://localhost:8000/api/user")
                setUser(data)
            } catch (error) {
                console.error("Error fetching user data", error)
            }
        }

        fetchData()
    }, [token, navigate])

    const logoutHandler = async () => {
        setIsLoading(true)
        try {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            await axios.post("http://localhost:8000/api/logout")
            localStorage.removeItem("token")
            navigate("/")
        } catch (error) {
            console.error("Error during logout", error)
            navigate("/dashboard")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container" style={{ marginTop: "50px" }}>
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            SELAMAT DATANG <strong className="text-uppercase">{user.name}</strong>
                            <hr />
                            <button onClick={logoutHandler} className="btn btn-md btn-danger" disabled={isLoading}>
                            { isLoading ? "Logging out..." : "LOGOUT" }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
