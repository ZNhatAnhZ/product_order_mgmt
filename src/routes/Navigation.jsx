import {Link} from "react-router";

export const Navigation = () => {
    return (<div>
            <Link to='/login'>Login</Link>
            <Link to='/dashboard' style={{marginLeft: '1rem'}}>Dashboard</Link>
        </div>
    )
}