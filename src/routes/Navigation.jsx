import {Link} from "react-router";

export const Navigation = () => {
    return (
        <div>
            <div>
                <Link to='/login'>Login</Link>
            </div>
            <div>
                <Link to='/dashboard'>Dashboard</Link>
            </div>
            <div>
                <Link to='/products'>Products</Link>
            </div>
        </div>
    )
}