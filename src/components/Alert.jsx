export const Alert = ({message}) => {
    return (
        <div className="row">
            <div className="offset-s2 col s8">
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            </div>
        </div>
    )
}