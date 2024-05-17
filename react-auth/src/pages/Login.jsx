import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Login = () => {

    const [credentials, setCredentials] = useState({email: "", password: ""})

    const [validation, setValidation] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    useEffect (() => {
        if (localStorage.getItem("token")) navigate("/dashboard")
    }, [navigate])

    const loginHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const {data} = await axios.post("http://localhost:8000/api/login", credentials)
            localStorage.setItem("token", data.token)
            navigate("/dashboard")
        } catch (error) {
            setValidation(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold">HALAMAN LOGIN</h4>
                            <hr />
                            {validation.message && (
                                <div className="alert alert-danger">{validation.message}</div>
                            )}
                            <form onSubmit={loginHandler}>
                                <div className="mb-3">
                                    <label className="form-label">ALAMAT EMAIL</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={credentials.email}
                                        onChange={handleChange}
                                        placeholder="Masukkan Alamat Email"
                                        disabled={isLoading}
                                    />
                                    {validation.email && (
                                        <div className="alert alert-danger">
                                            {validation.email[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">PASSWORD</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        placeholder="Masukkan Password"
                                        disabled={isLoading}
                                    />
                                    {validation.password && (
                                        <div className="alert alert-danger">
                                            {validation.password[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                        {isLoading ? "Logging in..." : "LOGIN"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
