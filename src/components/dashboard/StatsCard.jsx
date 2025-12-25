import Card from "./Card.jsx";
import {StatusBadge} from "../common/StatusBadge.jsx";

export default function StatsCard({icon, title, description, change, isWarning}) {
    return <Card>
        <div>{icon} - {title}</div>
        <StatusBadge status={isWarning ? 'pending': ''}>{description}</StatusBadge>
        <div>{change}</div>
    </Card>
}