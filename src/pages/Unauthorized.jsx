import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section style={{display: 'flex',height: '100vh',flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div>
                <button className="btn btn-primary" onClick={goBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unauthorized
