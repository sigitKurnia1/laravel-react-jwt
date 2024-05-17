import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })
    
    const [isLoading, setIsLoading] = useState(false)
    const[validation, setValidation] = useState({})

    const navigate = useNavigate()

    useEffect (() => {
        if (localStorage.getItem("token")) navigate ("/dashboard")
    }, [navigate])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const {name, email, password, password_confirmation} = formData

        try {
            await axios.post("http://localhost:8000/api/register", {
                name, email, password, password_confirmation: password_confirmation
            })
            navigate("/")
        } catch (error) {
            setValidation(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container" style={{ marginTop: "120px" }}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card border-0 rounded shadow-sm">
                        <div className="card-body">
                            <h4 className="fw-bold">HALAMAN REGISTER</h4>
                            <hr />
                            <form onSubmit={registerHandler}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">NAMA LENGKAP</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Masukkan Nama Lengkap"
                                            />
                                            {validation.name && (
                                                <div className="alert alert-danger">
                                                    {validation.name[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">ALAMAT EMAIL</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Masukkan Alamat Email"
                                            />
                                            {validation.email && (
                                                <div className="alert alert-danger">
                                                    {validation.email[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">PASSWORD</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                placeholder="Masukkan Password"
                                            />
                                            {validation.password && (
                                                <div className="alert alert-danger">
                                                    {validation.password[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">KONFIRMASI PASSWORD</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password_confirmation"
                                                value={formData.passwordConfirmation}
                                                onChange={handleChange}
                                                placeholder="Masukkan Konfirmasi Password"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                    {isLoading ? "Creating new account..." : "REGISTER"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
